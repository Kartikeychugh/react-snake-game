import { useCallback, useEffect } from "react";
import { ArrowkeyToDirection, GAME_STATE } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { increaseBody, updateBody, updateDirection } from "./snake.slice";
import { useAnimate } from "../../hooks/use-animate";
import { endGame } from "../game-board/game-board.slice";
import { generateFruitAsync } from "../fruit/fruit.slice";
import { collisionCheck, outboundCheck } from "./utils";
import { incrementScore } from "../score-board/score-board.slice";
import { GAME_END_REASON } from "../../models";

export const SnakeComponent = () => {
  const { body, stop, direction } = useAppSelector((state) => state.snake);
  const { blockWidth, level, status, reason } = useAppSelector(
    (state) => state.gameBoard
  );
  const dispatch = useAppDispatch();

  useOutboundCheck();
  useCollisionCheck();
  useFruitConsumedCheck();

  const moveSnake = useMoveSnakeCallback();

  useEffect(() => {
    moveSnake();
  }, [direction, moveSnake]);

  useAnimate(moveSnake, level * 6, stop);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (stop) return;
      if (ArrowkeyToDirection[e.code] === undefined) return;
      dispatch(updateDirection(ArrowkeyToDirection[e.code]));
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [stop, dispatch]);

  return (
    <>
      {body.map((block, index) => (
        <div
          key={index}
          className={`block ${
            status === GAME_STATE.END ? "animate-flicker" : ""
          }`}
          style={{
            height: blockWidth,
            width: blockWidth,
            top: block.x,
            left: block.y,
            ...(index === 0
              ? {
                  background:
                    reason === GAME_END_REASON.SELF_COLLISION
                      ? "#cc3333"
                      : "#288530",
                  zIndex: 1,
                }
              : {}),
          }}
        ></div>
      ))}
    </>
  );
};

const useFruitConsumedCheck = () => {
  const { body } = useAppSelector((state) => state.snake);
  const { location } = useAppSelector((state) => state.fruit);
  const { level } = useAppSelector((state) => state.gameBoard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (body[0].x === location.x && body[0].y === location.y) {
      dispatch(generateFruitAsync());
      dispatch(incrementScore(level * 2));
      dispatch(increaseBody());
    }
  }, [body, location.x, location.y, dispatch, level]);
};

const useCollisionCheck = () => {
  const { body } = useAppSelector((state) => state.snake);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (collisionCheck(body)) {
      dispatch(endGame(GAME_END_REASON.SELF_COLLISION));
    }
  }, [body, dispatch]);
};

const useOutboundCheck = () => {
  const { body, direction } = useAppSelector((state) => state.snake);
  const { boardWidth, boardHeight, blockWidth } = useAppSelector(
    (state) => state.gameBoard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      outboundCheck(body[0], direction, boardHeight, boardWidth, blockWidth)
    ) {
      dispatch(endGame(GAME_END_REASON.BOUNDARY_COLLISION));
    }
  }, [body, direction, boardHeight, boardWidth, dispatch, blockWidth]);
};

const useMoveSnakeCallback = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(updateBody());
  }, [dispatch]);
};

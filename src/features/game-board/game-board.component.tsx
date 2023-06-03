import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FruitComponent } from "../fruit/fruit.component";
import { SnakeComponent } from "../snake/snake.component";
import { GAME_STATE } from "../../constants";
import {
  pauseGame,
  restartGame,
  setLevel,
  startGame,
} from "./game-board.slice";
import { resetSnake } from "../snake/snake.slice";
import { generateFruitAsync } from "../fruit/fruit.slice";
import { resetScore } from "../score-board/score-board.slice";
import { GAME_END_REASON } from "../../models";
import { CurrentScoreBoardComponent } from "../score-board/current-score-board.component";

export const GameBoardComponent = () => {
  const { boardHeight, boardWidth, status, reason } = useAppSelector(
    (state) => state.gameBoard
  );
  const { fruitsEaten } = useAppSelector((state) => state.scoreBoard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLevel(Math.floor(fruitsEaten / 10) + 1));
  }, [dispatch, fruitsEaten]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code !== "Enter") return;
      if (status === GAME_STATE.PAUSED) dispatch(startGame());
      if (status === GAME_STATE.PLAY) dispatch(pauseGame());
      if (status === GAME_STATE.END) {
        dispatch(restartGame());
        dispatch(resetSnake());
        dispatch(generateFruitAsync());
        dispatch(resetScore());
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [dispatch, status]);

  return (
    <div
      className="game-board"
      style={{
        boxShadow:
          reason === GAME_END_REASON.BOUNDARY_COLLISION
            ? "0 0 5px inset red"
            : "0 0 5px inset #288530",
        backgroundColor: " #dbebdd",
        width: boardWidth,
        height: boardHeight,
      }}
    >
      <FruitComponent />
      <SnakeComponent />
      <CurrentScoreBoardComponent />
    </div>
  );
};

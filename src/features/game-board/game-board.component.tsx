import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FruitComponent } from "../fruit/fruit.component";
import { SnakeComponent } from "../snake/snake.component";
import { GAME_STATE } from "../../constants";
import { pauseGame, restartGame, startGame } from "./game-board.slice";
import { resetSnake } from "../snake/snake.slice";
import { generateFruitAsync } from "../fruit/fruit.slice";
import { resetScore } from "../score-board/score-board.slice";
import { GAME_END_REASON } from "../../models";
import { CurrentScoreBoardComponent } from "../score-board/current-score-board.component";

export const GameBoardComponent = () => {
  const { boardHeight, boardWidth, status, reason } = useAppSelector(
    (state) => state.gameBoard
  );
  const dispatch = useAppDispatch();

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
      style={{
        boxShadow: "0 0 10px lightgrey",
        width: boardWidth,
        height: boardHeight,
      }}
    >
      <div
        className={`game-board ${
          reason === GAME_END_REASON.BOUNDARY_COLLISION ? "error-border" : ""
        }`}
        style={{ width: boardWidth, height: boardHeight }}
      >
        <FruitComponent />
        <SnakeComponent />
        <CurrentScoreBoardComponent />
      </div>
    </div>
  );
};

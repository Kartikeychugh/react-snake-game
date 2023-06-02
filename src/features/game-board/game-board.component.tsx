import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FruitComponent } from "../fruit/fruit.component";
import { SnakeComponent } from "../snake/snake.component";
import { GAME_STATE } from "../../constants";
import { pauseGame, startGame } from "./game-board.slice";
import { resetSnake } from "../snake/snake.slice";
import { generateFruitAsync } from "../fruit/fruit.slice";
import { resetScore } from "../score-board/score-board.slice";

export const GameBoardComponent = () => {
  const { boardHeight, boardWidth, status } = useAppSelector(
    (state) => state.gameBoard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code !== "Enter") return;
      if (status === GAME_STATE.PAUSED) dispatch(startGame());
      if (status === GAME_STATE.PLAY) dispatch(pauseGame());
      if (status === GAME_STATE.END) {
        dispatch(pauseGame());
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
    <div className="board" style={{ width: boardWidth, height: boardHeight }}>
      <FruitComponent />
      <SnakeComponent />
    </div>
  );
};

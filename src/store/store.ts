import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { configureSnakeReducer } from "../features/snake/snake.slice";
import { gameBoardReducer } from "../features/game-board/game-board.slice";
import { fruitReducer } from "../features/fruit/fruit.slice";
import { scoreBoardReducer } from "../features/score-board/score-board.slice";
import { generateSnake } from "../utils/generate-random-snake";
import { GAME_STATE } from "../constants";
import { generateFruit } from "../utils/generate-random-fruit";

export const createStore = (configuration: {
  boardHeight: number;
  boardWidth: number;
  initialSnakeBlocks: number;
  blockWidth: number;
  level: number;
}) => {
  const { boardHeight, boardWidth, initialSnakeBlocks, blockWidth, level } =
    configuration;
  return configureStore({
    reducer: {
      snake: configureSnakeReducer({
        initialSnakeBlocks,
        boardHeight,
        boardWidth,
        blockWidth,
      }).reducer,
      gameBoard: gameBoardReducer,
      fruit: fruitReducer,
      scoreBoard: scoreBoardReducer,
    },
    preloadedState: {
      snake: {
        direction: 1,
        body: generateSnake(
          initialSnakeBlocks,
          boardHeight,
          boardWidth,
          blockWidth
        ),
        stop: true,
      },
      gameBoard: {
        boardHeight,
        boardWidth,
        status: GAME_STATE.PAUSED,
        blockWidth,
        level,
        reason: null,
      },
      fruit: { location: generateFruit(boardHeight, boardWidth, blockWidth) },
      scoreBoard: { currentScore: 0, pastScores: [] },
    },
  });
};

type Store = ReturnType<typeof createStore>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

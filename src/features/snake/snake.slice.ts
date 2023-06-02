import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { ISnakeState } from "./models";
import { move } from "../../utils/move";
import { endGame, pauseGame, startGame } from "../game-board/game-board.slice";
import { generateSnake } from "../../utils/generate-random-snake";

type Slice = ReturnType<typeof configureSnakeReducer>;

const updateBody: Slice["actions"]["updateBody"] = createAction<
  void,
  "snake/updateBody"
>("snake/updateBody");
const updateDirection: Slice["actions"]["updateDirection"] = createAction(
  "snake/updateDirection"
);
const stopSnake: Slice["actions"]["stopSnake"] =
  createAction("snake/stopSnake");
const resetSnake: Slice["actions"]["resetSnake"] = createAction<
  void,
  "snake/resetSnake"
>("snake/resetSnake");
const increaseBody: Slice["actions"]["increaseBody"] = createAction<
  void,
  "snake/increaseBody"
>("snake/increaseBody");

export const configureSnakeReducer = (configuration: {
  initialSnakeBlocks: number;
  boardHeight: number;
  boardWidth: number;
  blockWidth: number;
}) => {
  const { initialSnakeBlocks, boardHeight, blockWidth, boardWidth } =
    configuration;

  const initialState: () => ISnakeState = () => ({
    direction: 1,
    body: generateSnake(
      initialSnakeBlocks,
      boardHeight,
      boardWidth,
      blockWidth
    ),
    stop: true,
  });

  const snakeSlice = createSlice({
    name: "snake",
    initialState: initialState(),
    reducers: {
      updateDirection: (state, action: PayloadAction<number>) => {
        if (state.stop) return;

        if ((state.direction ^ 2) === action.payload) return;
        state.direction = action.payload;
      },
      updateBody: (state) => {
        if (state.stop) return;

        const { body, direction } = state;
        const head = body[0];
        const newHead = move(head.x, head.y, direction, blockWidth);
        const newBody = [newHead, ...body.slice(0, body.length - 1)];
        state.body = newBody;
      },
      increaseBody: (state) => {
        if (state.stop) return;

        const { body, direction } = state;
        const head = body[0];
        const newHead = move(head.x, head.y, direction, blockWidth);
        const newBody = [newHead, ...body];
        state.body = newBody;
      },
      stopSnake: (state, action: PayloadAction<boolean>) => {
        state.stop = action.payload;
      },
      resetSnake: (state) => {
        const newState = initialState();
        state.body = newState.body;
        state.direction = newState.direction;
        state.stop = newState.stop;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(startGame, (state) => {
          state.stop = false;
        })
        .addCase(pauseGame, (state) => {
          state.stop = true;
        })
        .addCase(endGame, (state) => {
          state.stop = true;
        });
    },
  });

  return snakeSlice;
};

export { updateBody, updateDirection, stopSnake, resetSnake, increaseBody };

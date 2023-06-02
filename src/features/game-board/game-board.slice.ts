import { createSlice } from "@reduxjs/toolkit";
import { IGameBoardState } from "./models";
import { GAME_STATE } from "../../constants";

const initialState: IGameBoardState = {
  boardHeight: 500,
  boardWidth: 500,
  status: GAME_STATE.PAUSED,
  blockWidth: 10,
  level: 1,
};

export const gameBoardSlice = createSlice({
  name: "gameBoard",
  initialState,
  reducers: {
    pauseGame: (state) => {
      state.status = GAME_STATE.PAUSED;
    },
    startGame: (state) => {
      state.status = GAME_STATE.PLAY;
    },
    endGame: (state) => {
      state.status = GAME_STATE.END;
    },
  },
});

export const { pauseGame, startGame, endGame } = gameBoardSlice.actions;
export const gameBoardReducer = gameBoardSlice.reducer;

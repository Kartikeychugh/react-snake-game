import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGameBoardState } from "./models";
import { GAME_STATE } from "../../constants";
import { GAME_END_REASON } from "../../models";

const initialState: IGameBoardState = {
  boardHeight: 500,
  boardWidth: 500,
  status: GAME_STATE.PAUSED,
  reason: null,
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
    endGame: (state, action: PayloadAction<GAME_END_REASON>) => {
      state.status = GAME_STATE.END;
      state.reason = action.payload;
    },
    restartGame: (state) => {
      state.status = GAME_STATE.PAUSED;
      state.reason = null;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { pauseGame, startGame, endGame, restartGame, setLevel } =
  gameBoardSlice.actions;
export const gameBoardReducer = gameBoardSlice.reducer;

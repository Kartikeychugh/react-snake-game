import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IScoreBoardState } from "./models";
import { endGame } from "../game-board/game-board.slice";

const initialState: IScoreBoardState = {
  currentScore: 0,
  fruitsEaten: 0,
  pastScores: [],
};

export const scoreBoardSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    incrementScore: (state, action: PayloadAction<number>) => {
      state.currentScore += action.payload;
    },
    resetScore: (state) => {
      state.currentScore = 0;
      state.fruitsEaten = 0;
    },
    incrementFruitsEaten: (state) => {
      state.fruitsEaten += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endGame, (state) => {
      state.pastScores = [state.currentScore, ...state.pastScores];
    });
  },
});

export const scoreBoardReducer = scoreBoardSlice.reducer;
export const { incrementScore, resetScore, incrementFruitsEaten } =
  scoreBoardSlice.actions;

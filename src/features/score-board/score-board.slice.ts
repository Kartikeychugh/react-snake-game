import { createSlice } from "@reduxjs/toolkit";
import { IScoreBoardState } from "./models";

const initialState: IScoreBoardState = {
  score: 0,
};

export const scoreBoardSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 10;
    },
    resetScore: (state) => {
      state.score = 0;
    },
  },
});

export const scoreBoardReducer = scoreBoardSlice.reducer;
export const { incrementScore, resetScore } = scoreBoardSlice.actions;

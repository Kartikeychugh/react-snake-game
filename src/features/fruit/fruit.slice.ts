import { createSlice } from "@reduxjs/toolkit";
import { generateFruit as _generateFruit } from "../../utils/generate-random-fruit";
import { IFruitState } from "./models";
import { AppDispatch, RootState } from "../../store/store";
import { ICoordinate } from "../../models";

const initialState: IFruitState = {
  location: { x: 0, y: 0 },
};

const collisionCheck = (fruit: ICoordinate, body: ICoordinate[]) => {
  let flag = false;
  body.forEach((block, index) => {
    if (block.x === fruit.x && block.y === fruit.y && index !== 0) flag = true;
  });
  return flag;
};

export const generateFruitAsync =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { body } = getState().snake;
    const { boardWidth, boardHeight, blockWidth } = getState().gameBoard;

    let fruit = _generateFruit(boardHeight, boardWidth, blockWidth);
    while (collisionCheck(fruit, body)) {
      fruit = _generateFruit(boardHeight, boardWidth, blockWidth);
    }
    dispatch(generateFruit(fruit));
  };

export const fruitSlice = createSlice({
  name: "fruit",
  initialState,
  reducers: {
    generateFruit: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { generateFruit } = fruitSlice.actions;
export const fruitReducer = fruitSlice.reducer;

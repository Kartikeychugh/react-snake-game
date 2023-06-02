import { Random } from "./generate-random-number";

export const generateSnake = (
  initBlocks: number,
  boardHeight: number,
  boardWidth: number,
  blockWidth: number
) => {
  const x_start =
    Random(0, (boardHeight - blockWidth) / blockWidth) * blockWidth;
  const y_start =
    Random(0, (boardWidth - initBlocks * blockWidth) / blockWidth) * blockWidth;

  return Array(initBlocks)
    .fill(0)
    .map((_, index) => ({
      x: x_start,
      y: y_start + (initBlocks - index - 1) * blockWidth,
    }));
};

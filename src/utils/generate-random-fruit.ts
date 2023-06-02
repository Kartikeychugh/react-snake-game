import { Random } from "./generate-random-number";

export const generateFruit = (
  boardHeight: number,
  boardWidth: number,
  blockWidth: number
) => {
  const x = Random(0, (boardHeight - blockWidth) / blockWidth) * blockWidth;
  const y = Random(0, (boardWidth - blockWidth) / blockWidth) * blockWidth;
  return { x, y };
};

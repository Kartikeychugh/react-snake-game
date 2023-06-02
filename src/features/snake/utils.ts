import { ICoordinate } from "../../models";

export const outboundCheck = (
  head: ICoordinate,
  direction: number,
  boardHeight: number,
  boardWidth: number,
  blockWidth: number
) => {
  return (
    (head.x < 0 && direction === 0) ||
    (head.x + blockWidth > boardHeight && direction === 2) ||
    (head.y < 0 && direction === 3) ||
    (head.y + blockWidth > boardWidth && direction === 1)
  );
};

export const collisionCheck = (body: ICoordinate[]) => {
  let flag = false;
  const head = body[0];
  body.forEach((block, index) => {
    if (block.x === head.x && block.y === head.y && index !== 0) flag = true;
  });
  return flag;
};

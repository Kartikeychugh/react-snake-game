export const move = (
  x: number,
  y: number,
  direction: number,
  blockWidth: number
) => {
  switch (direction) {
    case 0:
      return { x: x - blockWidth, y };
    case 1:
      return { x, y: y + blockWidth };
    case 2:
      return { x: x + blockWidth, y };
    case 3:
      return { x, y: y - blockWidth };

    default:
      return { x, y };
  }
};

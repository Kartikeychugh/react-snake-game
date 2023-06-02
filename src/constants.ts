export const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
export const ArrowkeyToDirection: { [key: string]: number } = {
  ArrowUp: 0,
  ArrowRight: 1,
  ArrowDown: 2,
  ArrowLeft: 3,
};
export enum GAME_STATE {
  PLAY,
  PAUSED,
  END,
}

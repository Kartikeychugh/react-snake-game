export interface ICoordinate {
  x: number;
  y: number;
}

export enum GAME_END_REASON {
  BOUNDARY_COLLISION,
  SELF_COLLISION,
}

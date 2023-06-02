import { ICoordinate } from "../../models";

export interface ISnakeState {
  direction: number;
  body: ICoordinate[];
  stop: boolean;
}

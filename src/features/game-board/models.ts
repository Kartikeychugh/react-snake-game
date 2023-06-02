import { GAME_STATE } from "../../constants";

export interface IGameBoardState {
  boardWidth: number;
  boardHeight: number;
  status: GAME_STATE;
  blockWidth: number;
  level: number;
}

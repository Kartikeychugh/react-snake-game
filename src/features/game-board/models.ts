import { GAME_STATE } from "../../constants";
import { GAME_END_REASON } from "../../models";

export interface IGameBoardState {
  boardWidth: number;
  boardHeight: number;
  status: GAME_STATE;
  blockWidth: number;
  level: number;
  reason: GAME_END_REASON | null;
}

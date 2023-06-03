import { GAME_STATE } from "../../constants";
import { useAppSelector } from "../../store/hooks";

export const CurrentScoreBoardComponent = () => {
  const { currentScore } = useAppSelector((state) => state.scoreBoard);
  const { status } = useAppSelector((state) => state.gameBoard);
  return (
    <div
      className="score-board"
      style={{ opacity: status === GAME_STATE.PLAY ? 0.3 : 1 }}
    >
      <div> {currentScore}</div>
    </div>
  );
};

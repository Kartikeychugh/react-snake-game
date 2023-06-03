import { useAppSelector } from "../../store/hooks";

export const PastScoreBoardComponent = () => {
  const { pastScores } = useAppSelector((state) => state.scoreBoard);
  return (
    <div className="past-score-list" style={{ height: 500, width: 200 }}>
      {pastScores.map((score) => (
        <div className="past-score-entry ">{score}</div>
      ))}
    </div>
  );
};

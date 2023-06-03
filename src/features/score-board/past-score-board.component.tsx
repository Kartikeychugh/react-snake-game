import { useAppSelector } from "../../store/hooks";

export const PastScoreBoardComponent = () => {
  const { pastScores } = useAppSelector((state) => state.scoreBoard);
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Past Scores
      </div>
      <div className="past-score-list" style={{ height: "100%", width: 250 }}>
        {pastScores.map((score) => (
          <div className="past-score-entry ">{score}</div>
        ))}
      </div>
    </div>
  );
};

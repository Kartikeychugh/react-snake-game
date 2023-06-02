import { useAppSelector } from "../../store/hooks";

export const ScoreBoardComponent = () => {
  const { score } = useAppSelector((state) => state.scoreBoard);
  return <div>{score}</div>;
};

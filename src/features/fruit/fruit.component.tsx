import { useAppSelector } from "../../store/hooks";

export const FruitComponent = () => {
  const { location } = useAppSelector((state) => state.fruit);
  const { blockWidth } = useAppSelector((state) => state.gameBoard);

  return (
    <div
      className="fruit"
      style={{
        width: blockWidth,
        height: blockWidth,
        top: location.x,
        left: location.y,
      }}
    ></div>
  );
};

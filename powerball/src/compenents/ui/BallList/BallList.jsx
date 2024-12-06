import "./BallList.scss";
export const BallList = () => {
  const ballList = [1, 2, 3, 4, 5];
  return (
    <ul>
      {ballList.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

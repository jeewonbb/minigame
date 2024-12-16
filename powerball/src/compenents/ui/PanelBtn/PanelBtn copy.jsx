import "./PanelBtn.scss";
export const PanelBtn = ({ position, onClick }) => {
  return (
    <button
      type="button"
      className="btn-panel-slide"
      data-position={position}
      onClick={(position) => onClick(position)}
    ></button>
  );
};

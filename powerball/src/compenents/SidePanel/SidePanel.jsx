import "./SidePanel.scss";
export const SidePanel = ({ dataPosition, isActive, content, ...props }) => {
  return (
    <aside
      data-position={props["data-position"]}
      className={`panel ${isActive ? "active" : ""}`}
    >
      {content}
    </aside>
  );
};

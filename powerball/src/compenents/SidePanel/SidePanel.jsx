import "./SidePanel.scss";
export const SidePanel = ({ content, ...props }) => {
  return (
    <aside className="panel" data-position={props["data-position"]}>
      {content}
    </aside>
  );
};

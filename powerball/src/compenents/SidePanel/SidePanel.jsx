import "./SidePanel.scss";
import { PanelBtn } from "../ui/PanelBtn/PanelBtn";
export const SidePanel = ({ content, ...props }) => {
  return (
    <aside className="panel" data-position={props["data-position"]}>
      <PanelBtn />
      {content}
    </aside>
  );
};

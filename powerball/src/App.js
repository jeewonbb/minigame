import { useState } from "react";
import { TitleHeader } from "./compenents/ui/TitleHeader/TitleHeader";
import { GamePanel } from "./compenents/GamePanel/GamePanel";
import { SidePanel } from "./compenents/SidePanel/SidePanel";
import { LeftContent } from "./compenents/SidePanel/LeftContent";
import { RightContent } from "./compenents/SidePanel/RightContent";
import "./assets/styles/gameStyle.scss";
import "reset-css";

function App() {
  const [activePanel, setActivePanel] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const togglePanel = (position) => {
    setActivePanel((prev) => (prev === position ? null : position));
    setActiveButton((prev) => (prev === position ? null : position));
  };
  return (
    <>
      <TitleHeader />
      <div className="container">
        <SidePanel
          data-position="left"
          content={<LeftContent />}
          isActive={activePanel === "left"}
        />
        <GamePanel
          activeButton={activeButton}
          onToggleLeft={() => togglePanel("left")}
          onToggleRight={() => togglePanel("right")}
        />
        <SidePanel
          data-position="right"
          content={<RightContent />}
          isActive={activePanel === "right"}
        />
      </div>
    </>
  );
}

export default App;

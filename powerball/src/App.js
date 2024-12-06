import { GamePanel } from "./compenents/GamePanel/GamePanel";
import { SidePanel } from "./compenents/SidePanel/SidePanel";
import { LeftContent } from "./compenents/SidePanel/LeftContent";
import { RightContent } from "./compenents/SidePanel/RightContent";
import "./assets/styles/gameStyle.scss";
import "reset-css";

function App() {
  return (
    <div className="container">
      <SidePanel data-position="left" content={<LeftContent />} />
      <GamePanel />
      <SidePanel data-position="right" content={<RightContent />} />
    </div>
  );
}

export default App;

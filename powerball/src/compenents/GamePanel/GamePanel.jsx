import { useState } from "react";
import { PanelBtn } from "../ui/PanelBtn/PanelBtn";
import Main from "../betting/Main";
import Game from "../betting/Game";
import Bet from "../betting/Bet";
import "./GamePanel.scss";
export const GamePanel = ({ activeButton, onToggleLeft, onToggleRight }) => {
  const [refresh, setRefresh] = useState("refresh");

  return (
    <section className="panel">
      {/* <Main></Main>
      <Game></Game>
      <Bet></Bet> */}
      <Main setRefresh={setRefresh} />
      <PanelBtn
        data-position="left"
        isActive={activeButton === "left"}
        onClick={onToggleLeft}
      />
      <PanelBtn
        data-position="right"
        isActive={activeButton === "right"}
        onClick={onToggleRight}
      />
    </section>
  );
};

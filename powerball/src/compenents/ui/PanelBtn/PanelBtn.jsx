import { useState } from "react";
import "./PanelBtn.scss";
export const PanelBtn = ({ isActive, onClick, ...props }) => {
  return (
    <button
      type="button"
      className={`btn-panel-slide ${isActive ? "active" : ""}`}
      data-position={props["data-position"]}
      onClick={onClick}
    ></button>
  );
};

import { useState } from "react";
import { InputRadio, InputSwitch } from "../Btn/Btn";
// import * as Lang from "../../../js/lang";

import "./MenuList.scss";
export const MenuList = () => {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [switchStates, setSwitchStates] = useState({
    switch1: false,
    switch2: false,
    switch3: false,
  });
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleToggle = (key) => (e) => {
    setSwitchStates({
      ...switchStates,
      [key]: e.target.checked,
    });
  };

  const handleActive = () => {
    setIsActive((prev) => !prev);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`drop-set-box ${isActive ? "active" : ""}`}
      onClick={handleActive}
    >
      <button
        type="button"
        className={`menu-btn ${isActive ? "open" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleActive();
        }}
      ></button>
      <div className="inner" onClick={stopPropagation}>
        <ul>
          <li>
            <button type="button" className="ic-manual">
              매뉴얼
            </button>
          </li>
          <li>
            <button type="button" className="ic-stats">
              통계
            </button>
          </li>
        </ul>
        <ul>
          <li>
            <p className="ic-bgm">
              {Lang.getLang("general", "sound_1", props.lang)}
            </p>
            <label className={soundBgm ? " switch-checked" : ""}>
              <input
                role="switch"
                type="checkbox"
                defaultChecked={soundBgm}
                onChange={fn_bgm_turn}
              />
            </label>
          </li>
          <li>
            <p className="ic-effect">
              {Lang.getLang("general", "sound_2", props.lang)}
            </p>
            <label className={soundEffect ? " switch-checked" : ""}>
              <input
                role="switch"
                type="checkbox"
                defaultChecked={soundEffect}
                onChange={fn_effect_turn}
              />
            </label>
          </li>
        </ul>
        <ul>
          <li>
            <p className="ic-bgm">BGM</p>
            <InputSwitch
              checked={switchStates.switch1}
              onChange={handleToggle("switch1")}
            />
          </li>
          <li>
            <p className="ic-effect">효과음</p>
            <InputSwitch
              checked={switchStates.switch2}
              onChange={handleToggle("switch2")}
            />
          </li>
        </ul>
        <ul>
          <li>
            <p className="ic-bet1" href="#!">
              베팅 선택
            </p>
            <InputRadio
              name="betting_board"
              value="option1"
              checked={selectedValue === "option1"}
              onChange={handleChange}
            />
          </li>
          <li>
            <p class="ic-bet2" href="#!">
              베팅 입력
            </p>
            <InputRadio
              name="betting_board"
              value="option2"
              checked={selectedValue === "option2"}
              onChange={handleChange}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

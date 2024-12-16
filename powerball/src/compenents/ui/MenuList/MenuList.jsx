import { useState } from "react";
import { InputRadio, InputSwitch } from "../Btn/Btn";
import "./MenuList.scss";
export const MenuList = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [switchStates, setSwitchStates] = useState({
    switch1: false,
    switch2: false,
    switch3: false,
  });

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleToggle = (key) => (e) => {
    setSwitchStates({
      ...switchStates,
      [key]: e.target.checked,
    });
  };

  return (
    <div className="drop_set_box">
      <div className="inner">
        <ul>
          <li>
            <button className="ic-manual">매뉴얼</button>
          </li>
          <li>
            <button className="ic-stats">통계</button>
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

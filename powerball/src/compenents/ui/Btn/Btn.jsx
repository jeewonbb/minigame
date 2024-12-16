import "./Btn.scss";

export const InputSwitch = ({ checked, onChange, disabled }) => {
  return (
    <label>
      <input
        role="switch"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </label>
  );
};

export const InputRadio = ({ name, value, checked, onChange, disabled }) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span />
    </label>
  );
};

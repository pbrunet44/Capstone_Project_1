// Created by Philip Brunet

import "./CheckboxInput.css";

function CheckboxInput({ name, labelText = name, checked, onChange }) {
  return (
    <div className="checkbox-input">
      <label className="checkbox-input__label" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="checkbox-input__checkbox"
        type="checkbox"
        name={name}
        id={name}
        value={name}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default CheckboxInput;

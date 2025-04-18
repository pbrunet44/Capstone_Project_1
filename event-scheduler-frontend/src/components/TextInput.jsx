// Created by Philip Brunet

import "./TextInput.css";

function TextInput({
  name,
  type = "text",
  labelText = name,
  placeholder = name,
  value,
  onChange,
  required = true,
}) {
  return (
    <div className="text-input">
      <label className="text-input__label" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="text-input__input"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default TextInput;

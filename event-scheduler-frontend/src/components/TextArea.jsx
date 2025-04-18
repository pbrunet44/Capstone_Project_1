// Created by Philip Brunet

import "./TextArea.css";

function TextArea({
  name,
  type = "text",
  labelText = name,
  placeholder = name,
  value,
  onChange,
}) {
  return (
    <div className="text-area">
      <label className="text-area__label" htmlFor={name}>
        {labelText}
      </label>
      <textarea
        className="text-area__area"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default TextArea;

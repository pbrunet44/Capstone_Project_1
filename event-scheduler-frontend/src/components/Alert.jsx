// Created by Philip Brunet

import "./Alert.css";

function Alert({ msg, isErr }) {
  return (
    <div
      className="alert"
      style={{
        border: isErr ? "5px solid #ff7276" : "5px solid #11837b",
        backgroundColor: isErr ? "darkred" : "darkgreen",
      }}
    >
      <p className="alert__msg">{msg}</p>
    </div>
  );
}

export default Alert;

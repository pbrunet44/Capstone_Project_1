// Created by Philip Brunet

import { useState } from "react";
import "./Alert.css";

function Alert({ msg, isErr }) {
  return (
    <div
      className="alert"
      style={{
        border: isErr ? "5px solid red" : "5px solid green",
        backgroundColor: isErr ? "darkred" : "darkgreen",
      }}
    >
      <p className="alert__msg">{msg}</p>
    </div>
  );
}

export default Alert;

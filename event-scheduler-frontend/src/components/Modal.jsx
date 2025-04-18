// Created by Philip Brunet

import "./Modal.css";
import Backdrop from "./Backdrop";

function Modal({ children }) {
  return (
    <div className="modal">
      <Backdrop />
      <div className="modal__child__container">{children}</div>
    </div>
  );
}

export default Modal;

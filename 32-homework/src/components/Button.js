import React from "react";

function Button({ children, type, onBtnClick }) {
  return (
    <button className={`btn ${type}`} onClick={onBtnClick}>
      {children}
    </button>
  );
}

export default Button;

import React from "react";

function Message({ children }) {
  return (
    <tr className="message">
      <td colSpan="3">{children}</td>
    </tr>
  );
}

export default Message;

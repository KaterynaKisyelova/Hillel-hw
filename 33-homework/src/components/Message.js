import React from "react";
import styles from "./Message.module.css";

function Message({ children, error }) {
  const classes = error
    ? `${styles.message} ${styles.error}`
    : `${styles.message}`;

  return <div className={classes}>{children}</div>;
}

export default Message;

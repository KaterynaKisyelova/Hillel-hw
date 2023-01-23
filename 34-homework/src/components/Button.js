import { useFormikContext } from "formik";
import React from "react";
import styles from "./Button.module.css";

function Button() {
  const formik = useFormikContext();

  return (
    <button className={styles.btn} type="submit" disabled={!formik.isValid}>
      Submit
    </button>
  );
}

export default Button;

import { ErrorMessage, Field } from "formik";
import React from "react";
import styles from "./InputItem.module.css";

function InputItem({ name }) {
  return (
    <div className={styles.form__item}>
      <Field name={name} placeholder={name} />
      <ErrorMessage className={styles.error} name={name} component="div" />
    </div>
  );
}

export default InputItem;

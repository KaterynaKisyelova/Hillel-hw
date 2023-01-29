import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputItem from "./InputItem";
import Button from "./Button";
import styles from "./FormApp.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.number()
    .test("length", "Must be exactly 12 characters", (val) =>
      val ? val.toString().length === 12 : "Required"
    )
    .required("Required"),
});

function FormApp() {
  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", phone: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          return values;
        }}
      >
        <Form className={styles.form}>
          <h1>Form</h1>
          <InputItem name="name" />
          <InputItem name="email" />
          <InputItem name="phone" />
          <Button />
        </Form>
      </Formik>
    </div>
  );
}

export default FormApp;

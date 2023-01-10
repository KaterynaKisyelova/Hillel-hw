import React, { useState } from "react";
import styles from "./TodoForm.module.css";

function TodoForm({ onFormSubmit }) {
  const [inputValue, setInputValue] = useState("");

  function onTodoFormSubmit(e) {
    e.preventDefault();

    if (!inputValue) {
      return;
    }

    const newTodo = {
      title: inputValue,
      done: false,
    };

    onFormSubmit(newTodo);
    setInputValue("");
  }

  function onInputValueChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <form onSubmit={onTodoFormSubmit}>
      <input
        className={styles.todo__input}
        value={inputValue}
        onChange={onInputValueChange}
      />
      <button className={styles.button}>Save</button>
    </form>
  );
}

export default TodoForm;

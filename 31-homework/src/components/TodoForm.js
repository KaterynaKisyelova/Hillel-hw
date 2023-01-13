import React, { useState } from "react";
import styles from "./TodoForm.module.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/actions/todo";

function TodoForm() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  function onTodoFormSubmit(e) {
    e.preventDefault();

    if (!inputValue) {
      return;
    }

    const newTodo = {
      title: inputValue,
      done: false,
      id: String(Math.random()),
    };

    dispatch(addTodo(newTodo));
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

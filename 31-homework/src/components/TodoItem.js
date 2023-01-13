import React from "react";
import styles from "./TodoItem.module.css";
import { useDispatch } from "react-redux";
import { deleteTodo, switchCompleteness } from "../store/actions/todo";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const completed = todo.done
    ? `${styles.todo__item} ${styles.complete}`
    : `${styles.todo__item}`;

  return (
    <li
      className={completed}
      data-id={todo.id}
      onClick={() => dispatch(switchCompleteness(todo.id))}
    >
      <span>{todo.title}</span>
      <button
        className={styles.button}
        onClick={() => {
          dispatch(deleteTodo(todo.id));
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;

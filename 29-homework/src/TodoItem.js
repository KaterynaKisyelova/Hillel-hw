import React from "react";
import styles from "./TodoItem.module.css";

function TodoItem({ todo, onDeleteBtnClick, onTodoItemClick }) {
  const completed = todo.done
    ? `${styles.todo__item} ${styles.complete}`
    : `${styles.todo__item}`;

  function onDeleteButtonClick(e) {
    e.stopPropagation();
    onDeleteBtnClick(todo.id);
  }

  return (
    <li
      className={completed}
      data-id={todo.id}
      onClick={() => onTodoItemClick(todo.id, { done: !todo.done })}
    >
      <span>{todo.title}</span>
      <button className={styles.button} onClick={onDeleteButtonClick}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;

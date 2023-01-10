import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

function TodoList({ onDeleteBtnClick, todoList, onTodoItemClick }) {
  return (
    <ul className={styles.todo__list}>
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onDeleteBtnClick={onDeleteBtnClick}
          onTodoItemClick={onTodoItemClick}
        />
      ))}
    </ul>
  );
}

export default TodoList;

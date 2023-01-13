import React from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";
import { useSelector } from "react-redux";

function TodoList() {
  const todoList = useSelector((state) => state.todoList);

  return (
    <ul className={styles.todo__list}>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;

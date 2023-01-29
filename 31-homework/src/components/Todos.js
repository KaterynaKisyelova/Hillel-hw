import React from "react";
import styles from "./Todos.module.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function Todos() {
  return (
    <div className={styles.todos}>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default Todos;

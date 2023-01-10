import React from "react";
import styles from "./Todos.module.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import useTodo from "./useTodo";

function Todos() {
  const {
    onTodoItemClick,
    onFormSubmit,
    onDeleteBtnClick,
    todoList,
    isLoading,
    error,
  } = useTodo();

  return (
    <div className={styles.todos}>
      <TodoForm onFormSubmit={onFormSubmit} />
      {error ? <div className={styles.error}>{error}</div> : null}
      {isLoading ? "Loading..." : ""}
      <TodoList
        todoList={todoList}
        onDeleteBtnClick={onDeleteBtnClick}
        onTodoItemClick={onTodoItemClick}
      />
    </div>
  );
}

export default Todos;

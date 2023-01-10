import { useState, useEffect } from "react";
import TodosApi from "./TodosApi";

export default function useTodo() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    TodosApi.get()
      .then((list) => {
        setTodoList(list);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  function onFormSubmit(todo) {
    TodosApi.create(todo)
      .then((newTodo) => setTodoList([...todoList, newTodo]))
      .catch((err) => setError(err.message));
  }

  function onDeleteBtnClick(id) {
    TodosApi.delete(id)
      .then((res) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== res.id);
        setTodoList(updatedTodoList);
      })
      .catch((err) => setError(err.message));
  }

  function onTodoItemClick(id, done) {
    TodosApi.update(id, done)
      .then((res) => {
        const updatedTodoList = todoList.map((todo) =>
          todo.id === res.id ? res : todo
        );
        setTodoList(updatedTodoList);
      })
      .catch((err) => setError(err.message));
  }

  return {
    onFormSubmit,
    onDeleteBtnClick,
    onTodoItemClick,
    todoList,
    isLoading,
    error,
  };
}

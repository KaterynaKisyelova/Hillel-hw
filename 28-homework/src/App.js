import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  function onTodoFormSubmit(e) {
    e.preventDefault();

    if (!inputValue) {
      return;
    }

    const updatedTodoList = [
      ...todoList,
      {
        title: inputValue,
        done: false,
        id: String(Math.random()),
      },
    ];

    setTodoList(updatedTodoList);
    setInputValue("");
  }

  function onInputValueChange(e) {
    setInputValue(e.target.value);
  }

  function onDeleteBtnClick(e) {
    const todo = e.target.closest(".todo__item");
    const updatedTodoList = todoList.filter(
      (item) => item.id !== todo.dataset.id
    );

    setTodoList(updatedTodoList);
  }

  return (
    <div className="todo">
      <form onSubmit={onTodoFormSubmit}>
        <input
          className="todo__input"
          value={inputValue}
          onChange={onInputValueChange}
        />
        <button className="button save__btn">Save</button>
      </form>
      <ul className="todo__list">
        {todoList.map((todo) => (
          <li className="todo__item" data-id={todo.id} key={todo.id}>
            <span>{todo.title}</span>
            <button className="button delete" onClick={onDeleteBtnClick}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

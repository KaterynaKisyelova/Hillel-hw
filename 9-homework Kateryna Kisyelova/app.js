"use strict";

const todoInput = document.querySelector(".todo__input");
const addTodoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");

addTodoButton.addEventListener("click", onAddTodoButtonClick);

function onAddTodoButtonClick() {
  if (todoInput.value.trim() !== "") {
    const todoItem = document.createElement("li");
    todoItem.textContent = todoInput.value;
    todoList.append(todoItem);
    todoInput.value = "";
  }
}

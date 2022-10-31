"use strict";

const DELETE_BTN_CLASS = "delete";
const COMPLETE_TODO_CLASS = "complete";
const TODO_ITEM_SELECTOR = ".todo__item";

const todoInput = document.querySelector(".todo__input");
const addTodoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const todoItemTemplate = document.querySelector("#todo-item").innerHTML;

addTodoButton.addEventListener("click", onAddTodoButtonClick);
todoList.addEventListener("click", onTodoListClick);

function onAddTodoButtonClick(e) {
  e.preventDefault();

  if (todoInput.value.trim()) {
    addTodo(todoInput.value);
    todoInput.value = "";
  }
}

function onTodoListClick(e) {
  const todoItem = findTodo(e.target);
  const deleteBtn = findDeleteBtn(e.target);

  if (deleteBtn) {
    deleteTodo(todoItem);
    return;
  }

  switchCompleteness(todoItem);
}

function createTodoItem(text) {
  return todoItemTemplate.replace("{{text}}", text);
}

function addTodo(value) {
  const todoItem = createTodoItem(value);
  todoList.insertAdjacentHTML("beforeend", todoItem);
}

function deleteTodo(el) {
  el.remove();
}

function findTodo(clickedItem) {
  return clickedItem.closest(TODO_ITEM_SELECTOR);
}

function findDeleteBtn(clickedItem) {
  return clickedItem.classList.contains(DELETE_BTN_CLASS);
}

function switchCompleteness(item) {
  item.classList.toggle(COMPLETE_TODO_CLASS);
}

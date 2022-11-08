"use strict";

const URL = "https://636809ddd1d09a8fa61fbd56.mockapi.io/todos/";
const DELETE_BTN_CLASS_NAME = "delete";
const COMPLETE_TODO_CLASS_NAME = "complete";
const TODO_ITEM_SELECTOR = ".todo__item";

const todoInput = document.querySelector(".todo__input");
const addTodoButton = document.querySelector(".todo__button");
const todoList = document.querySelector(".todo__list");
const todoItemTemplate = document.querySelector("#todo-item").innerHTML;

addTodoButton.addEventListener("click", onAddTodoButtonClick);
todoList.addEventListener("click", onTodoListClick);

getTodos();

function onAddTodoButtonClick(e) {
  e.preventDefault();

  if (todoInput.value.trim()) {
    const todo = { title: todoInput.value, completed: false };

    createNewTodo(todo);
    clearInput();
  }
}

function onTodoListClick(e) {
  const todoItem = findTodo(e.target);
  const deleteBtn = isDeleteBtn(e.target);

  if (deleteBtn) {
    deleteTodo(todoItem);
    return;
  }

  switchCompleteness(todoItem);
}

function getTodos() {
  fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error("Todos are not found."));
    })
    .then(renderTodos)
    .catch(showError);
}

function createNewTodo(todo) {
  fetch(URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todo),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error("New Todo is not created."));
    })
    .then(addTodo)
    .catch(showError);
}

function createTodoItem(todo) {
  return todoItemTemplate
    .replace("{{text}}", todo.title)
    .replace("{{id}}", todo.id)
    .replace("{{completed}}", todo.completed ? COMPLETE_TODO_CLASS_NAME : null);
}

function addTodo(todo) {
  const todoItem = createTodoItem(todo);
  todoList.insertAdjacentHTML("beforeend", todoItem);
}

function renderTodos(todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

function clearInput() {
  todoInput.value = "";
}

function deleteTodo(el) {
  fetch(`${URL}${el.dataset.id}`, {
    method: "DELETE",
  })
    .then(() => {
      clearContainer();
      getTodos();
    })
    .catch(showError);
}

function clearContainer() {
  todoList.textContent = null;
}

function findTodo(clickedItem) {
  return clickedItem.closest(TODO_ITEM_SELECTOR);
}

function isDeleteBtn(clickedItem) {
  return clickedItem.classList.contains(DELETE_BTN_CLASS_NAME);
}

function switchCompleteness(item) {
  item.classList.toggle(COMPLETE_TODO_CLASS_NAME);

  updateTodo(item);
}

function updateTodo(item) {
  const completedTodo = isCompletedTodo(item);

  fetch(`${URL}${item.dataset.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ completed: completedTodo }),
  })
    .then(() => {
      clearContainer();
      getTodos();
    })
    .catch(showError);
}

function isCompletedTodo(item) {
  return item.classList.contains(COMPLETE_TODO_CLASS_NAME);
}

function showError(error) {
  console.log(error.message);
}

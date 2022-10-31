"use strict";

const PHONE_INPUT_CLASS = "phone-input";
const DELETE_BTN_CLASS = "delete-button";
const TABLE_ROW_CLASS = ".table__row";

const [...tableInputs] = document.querySelectorAll(".table__input");
const addButton = document.querySelector(".add-button");
const tableRowTemplate = document.querySelector("#row-template").innerHTML;
const tableContent = document.querySelector(".table__body");

addButton.addEventListener("click", onAddButtonClick);
tableContent.addEventListener("click", onTableContentClick);

function onAddButtonClick() {
  const userData = getInputsValues(tableInputs);
  if (userData) {
    const newTableRow = generateTableRow(userData);
    tableContent.insertAdjacentHTML("beforeend", newTableRow);
    clearInputs(tableInputs);
  }
}

function onTableContentClick(e) {
  if (e.target.classList.contains(DELETE_BTN_CLASS)) {
    const todoItem = e.target.closest(TABLE_ROW_CLASS);
    todoItem.remove();
  }
}

function getInputsValues(inputs) {
  if (areInputsValid(inputs)) {
    return inputs.map((input) => input.value);
  }
  alert("Invalid data.");
}

function areInputsValid(inputs) {
  return inputs.every(
    (input) => input.value.trim() !== "" && isPhoneValid(input)
  );
}

function isPhoneValid(input) {
  if (input.classList.contains(PHONE_INPUT_CLASS)) {
    return !isNaN(Number(input.value));
  }
  return true;
}

function generateTableRow([name, surname, phone]) {
  return tableRowTemplate
    .replace("{{name}}", name)
    .replace("{{surname}}", surname)
    .replace("{{phone}}", phone);
}

function clearInputs(inputs) {
  inputs.forEach((input) => (input.value = ""));
}

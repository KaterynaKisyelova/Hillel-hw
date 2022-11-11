"use strict";

const USER_INFO = ["name", "surname", "phone"];
const PHONE_INPUT_CLASS_NAME = "phone-input";
const DELETE_BTN_CLASS_NAME = "delete-button";
const EDIT_BTN_CLASS_NAME = "edit-button";
const TABLE_ROW_SELECTOR = ".table__row";
const EDIT_CLASS_NAME = "edit";
const SAVE_TEXT = "Save";
const ADD_TEXT = "Add";

const [...tableInputs] = document.querySelectorAll(".table__input");
const addButton = document.querySelector(".add-button");
const tableForm = document.querySelector("#table-form");
const tableRowTemplate = document.querySelector("#row-template").innerHTML;
const tableContent = document.querySelector(".table__body");
let contactsList = [];
let editedContactId;

tableForm.addEventListener("submit", onTableFormSubmit);
tableContent.addEventListener("click", onTableContentClick);

getContacts();

function getContacts() {
  Contacts.get()
    .then((res) => {
      return (contactsList = [...res]);
    })
    .then(addTableContent)
    .catch((err) => console.log(err.message));
}

function onTableFormSubmit(e) {
  e.preventDefault();

  const newContact = generateContactObj(tableInputs);

  if (!newContact) {
    return;
  }

  clearForm(tableForm);

  if (isContain(e.target, EDIT_CLASS_NAME)) {
    editContact(newContact);
    return;
  }

  createContact(newContact);
}

function onTableContentClick(e) {
  if (isContain(e.target, DELETE_BTN_CLASS_NAME)) {
    const contactItem = findContact(e.target);

    deleteContact(contactItem);
    return;
  }
  if (isContain(e.target, EDIT_BTN_CLASS_NAME)) {
    const contactItem = findContact(e.target);

    makeContactEditable(contactItem);
  }
}

function addTableContent(contacts) {
  let fragment = document.createDocumentFragment();

  fragment = contacts.map((contact) => generateTableRow(contact)).join("");
  tableContent.insertAdjacentHTML("beforeend", fragment);
}

function generateContactObj(inputs) {
  if (!areInputsValid(inputs)) {
    return alert("Invalid data.");
  }

  return inputs.reduce((contact, input, index) => {
    return { ...contact, [USER_INFO[index]]: input.value };
  }, {});
}

function createContact(newContact) {
  Contacts.create(newContact)
    .then((res) => {
      contactsList.push(res);
      changeContent(tableContent, null);
      addTableContent(contactsList);
    })
    .catch((err) => console.log(err.message));

  const newTableRow = generateTableRow(newContact);
  tableContent.insertAdjacentHTML("beforeend", newTableRow);
}

function deleteContact(contactItem) {
  const id = contactItem.dataset.id;

  Contacts.delete(id)
    .then((res) => {
      contactsList = contactsList.filter((contact) => contact.id !== res.id);
      changeContent(tableContent, null);
      addTableContent(contactsList);
    })
    .catch((err) => console.log(err.message));

  contactItem.remove();
}

function makeContactEditable(contactItem) {
  editedContactId = contactItem.dataset.id;

  const contact = contactsList.find(
    (contact) => contact.id === editedContactId
  );

  tableInputs.forEach(
    (input, index) => (input.value = contact[USER_INFO[index]])
  );

  changeContent(addButton, SAVE_TEXT);
  tableForm.classList.add(EDIT_CLASS_NAME);
}

function editContact(newContact) {
  Contacts.update(editedContactId, newContact)
    .then((res) => {
      updateEditedContact(res);
      changeContent(tableContent, null);
      addTableContent(contactsList);
    })
    .catch((err) => console.log(err.message));

  changeContent(tableContent, null);
  updateEditedContact(newContact);
  addTableContent(contactsList);
  changeContent(addButton, ADD_TEXT);
  tableForm.classList.remove(EDIT_CLASS_NAME);
}

function updateEditedContact(editedContact) {
  contactsList = contactsList.map((contact) =>
    contact.id === editedContactId ? editedContact : contact
  );
}

function areInputsValid(inputs) {
  return inputs.every((input) =>
    isContain(input, PHONE_INPUT_CLASS_NAME)
      ? isPhoneValid(input)
      : isInputEmpty(input)
  );
}

function isContain(target, className) {
  return target.classList.contains(className);
}

function isInputEmpty(input) {
  return input.value.trim() !== "";
}

function isPhoneValid(input) {
  return isInputEmpty(input) && !isNaN(Number(input.value));
}

function generateTableRow(contact) {
  return tableRowTemplate
    .replace("{{id}}", contact.id)
    .replace("{{name}}", contact.name)
    .replace("{{surname}}", contact.surname)
    .replace("{{phone}}", contact.phone);
}

function findContact(target) {
  return target.closest(TABLE_ROW_SELECTOR);
}

function clearForm(form) {
  form.reset();
}

function changeContent(container, content) {
  container.textContent = content;
}

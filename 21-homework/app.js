"use strict";

const USER_INFO = ["firstName", "lastName", "phone"];
const PHONE_INPUT_CLASS_NAME = "phone-input";
const DELETE_BTN_SELECTOR = ".delete-button";
const EDIT_BTN_SELECTOR = ".edit-button";
const TABLE_ROW_SELECTOR = ".table-row";
const EDIT_CLASS_NAME = "edit";
const DATA_ID_ATTR = "data-id";
const INVALID_DATA_TEXT = "Invalid data.";

const $tableInputs = $(".table-input");
const $dialogForm = $("#dialog-form");
const $tableContent = $(".contacts-container");
const $createContactBtn = $("#create-contact");
let contactsList = [];
let editedContactId;

const dialog = $dialogForm.dialog({
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  buttons: {
    Save: () => {
      form.submit();
    },
    Cancel: () => {
      dialog.dialog("close");
    },
  },
  close: () => {
    form[0].reset();
  },
});

const form = dialog.find("form").on("submit", onFormSubmit);

$createContactBtn.button().on("click", onCreateContactBtnClick);
$tableContent
  .on("click", DELETE_BTN_SELECTOR, onDeleteBtnClick)
  .on("click", EDIT_BTN_SELECTOR, onEditBtnClick);

getContacts();

function getContacts() {
  Contacts.get()
    .then((res) => (contactsList = [...res]))
    .then(addTableContent)
    .catch((err) => console.log(err.message));
}

function onCreateContactBtnClick() {
  dialog.dialog("open");
}

function onFormSubmit(e) {
  e.preventDefault();

  if (!areInputsValid($tableInputs)) {
    alert(INVALID_DATA_TEXT);
    return;
  }

  const newContact = generateContactObj($tableInputs);

  if ($dialogForm.hasClass(EDIT_CLASS_NAME)) {
    editContact(newContact);
    dialog.dialog("close");
    return;
  }

  createContact(newContact);
  dialog.dialog("close");
}

function onDeleteBtnClick() {
  const $contactItem = findContact($(this));

  deleteContact($contactItem);
}

function onEditBtnClick() {
  dialog.dialog("open");
  const $contactItem = findContact($(this));

  makeContactEditable($contactItem);
}

function areInputsValid(inputs) {
  let valid = true;

  inputs.each((_, input) =>
    isPhone(input)
      ? (valid = valid && isPhoneValid(input))
      : (valid = valid && isInputEmpty(input))
  );

  return valid;
}

function isPhone(target) {
  return target.classList.contains(PHONE_INPUT_CLASS_NAME);
}

function isInputEmpty(input) {
  return input.value.trim() !== "";
}

function isPhoneValid(input) {
  return isInputEmpty(input) && !isNaN(input.value);
}

function generateTableRow(contact) {
  return `<tr class='table-row' data-id=${contact.id}>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phone}</td>
            <td>
              <button class='btn btn-primary edit-button'>Edit</button>
              <button class='btn btn-danger delete-button'>Delete</button>
            </td>
          </tr>`;
}

function deleteContact(contactItem) {
  const id = findContactId(contactItem);

  Contacts.delete(id)
    .then((res) => {
      contactsList = contactsList.filter((contact) => contact.id !== res.id);
      clearContainer();
      addTableContent(contactsList);
    })
    .catch((err) => console.log(err.message));

  contactItem.remove();
}

function makeContactEditable(contactItem) {
  editedContactId = findContactId(contactItem);

  const contact = contactsList.find(
    (contact) => contact.id === editedContactId
  );

  $tableInputs.each(
    (index, input) => (input.value = contact[USER_INFO[index]])
  );

  $dialogForm.addClass(EDIT_CLASS_NAME);
}

function addTableContent(contacts) {
  $tableContent.html(contacts.map((contact) => generateTableRow(contact)));
}

function generateContactObj(inputs) {
  let contactInfo = {};

  inputs.each((index, input) => {
    return (contactInfo = { ...contactInfo, [USER_INFO[index]]: input.value });
  });

  return contactInfo;
}

function createContact(newContact) {
  Contacts.create(newContact)
    .then((res) => {
      contactsList.push(res);
      clearContainer();
      addTableContent(contactsList);
    })
    .catch((err) => console.log(err.message));

  const newTableRow = generateTableRow(newContact);
  $tableContent.append(newTableRow);
}

function editContact(newContact) {
  newContact.id = editedContactId;

  Contacts.update(editedContactId, newContact)
    .then((res) => {
      updateEditedContact(res);
      clearContainer();
      addTableContent(contactsList);
    })
    .catch((err) => console.log(err.message));

  clearContainer();
  updateEditedContact(newContact);
  addTableContent(contactsList);
  $dialogForm.removeClass(EDIT_CLASS_NAME);
}

function updateEditedContact(editedContact) {
  contactsList = contactsList.map((contact) =>
    contact.id === editedContactId ? editedContact : contact
  );
}

function findContact(target) {
  return target.closest(TABLE_ROW_SELECTOR);
}

function findContactId(contact) {
  return contact.attr(DATA_ID_ATTR);
}

function clearContainer() {
  $tableContent.empty();
}

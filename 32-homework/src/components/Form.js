import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addContact, updateContact } from "../store/actions/contacts";

const INITIAL_INPUT_STATE = "";

function ContactsForm() {
  const [firstName, setFirstName] = useState(INITIAL_INPUT_STATE);
  const [lastName, setLastName] = useState(INITIAL_INPUT_STATE);
  const [phone, setPhone] = useState(INITIAL_INPUT_STATE);

  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact);

  useEffect(() => {
    setFirstName(contact?.firstName ?? "");
    setLastName(contact?.lastName ?? "");
    setPhone(contact?.phone ?? "");
  }, [contact]);

  function onFormSubmit(e) {
    e.preventDefault();

    const newContact = {
      ...contact,
      firstName,
      lastName,
      phone,
    };

    if (!isValidForm(newContact)) {
      return;
    }

    if (newContact.id) {
      dispatch(updateContact(newContact.id, newContact));
      return;
    }

    dispatch(addContact(newContact));

    setFirstName(INITIAL_INPUT_STATE);
    setLastName(INITIAL_INPUT_STATE);
    setPhone(INITIAL_INPUT_STATE);
  }

  function isValidForm(contact) {
    for (const value in contact) {
      if (contact[value].trim() === "") {
        return false;
      }
    }

    if (isNaN(Number(contact.phone))) {
      return false;
    }

    return true;
  }

  return (
    <form className="contacts-form" onSubmit={onFormSubmit}>
      <input
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button type="btn-save">Save</Button>
    </form>
  );
}

export default ContactsForm;

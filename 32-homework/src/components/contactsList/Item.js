import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact, editContact } from "../../store/actions/contacts";
import Button from "../Button";

function Item({ contact }) {
  const dispatch = useDispatch();

  function onEditClick() {
    dispatch(editContact(contact));
  }

  function onDeleteClick() {
    dispatch(deleteContact(contact.id));
  }

  return (
    <tr className="row" id={contact.id}>
      <td className="cell">{contact.firstName}</td>
      <td className="cell">{contact.lastName}</td>
      <td className="cell">{contact.phone}</td>
      <td className="cell">
        <Button type="edit-button" onBtnClick={onEditClick}>
          Edit
        </Button>
        <Button type="delete-button" onBtnClick={onDeleteClick}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default Item;

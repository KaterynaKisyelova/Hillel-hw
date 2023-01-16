import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import Message from "../Message";

function Table() {
  const { contactsList, isLoading, error } = useSelector((state) => state);

  return (
    <table className="contacts-table">
      <thead>
        <tr className="row main-row">
          <td className="cell">Name</td>
          <td className="cell">Surname</td>
          <td className="cell">Phone Number</td>
          <td className="cell">Actions</td>
        </tr>
      </thead>

      <tbody id="container">
        {isLoading ? <Message>Loading...</Message> : null}

        {error ? (
          <Message>Could not retrieve a list of contacts</Message>
        ) : null}

        {!isLoading &&
          !error &&
          contactsList.map((contact) => (
            <Item key={contact.id} contact={contact} />
          ))}
      </tbody>
    </table>
  );
}

export default Table;

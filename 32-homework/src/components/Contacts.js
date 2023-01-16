import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "./Form";
import Table from "./contactsList/Table";
import { getContacts } from "../store/actions/contacts";

function Contacts() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getContacts()), [dispatch]);

  return (
    <div className="contacts-app">
      <Form />
      <Table />
    </div>
  );
}

export default Contacts;

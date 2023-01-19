import ContactsApi from "./ContactsApi";

export const LOADING_ACTION = "LOADING_ACTION";
export const ERROR_ACTION = "ERROR_ACTION";
export const GET_LIST_ACTION = "GET_LIST_ACTION";
export const ADD_CONTACT_ACTION = "ADD_CONTACT_ACTION";
export const DELETE_CONTACT_ACTION = "DELETE_CONTACT_ACTION";
export const UPDATE_CONTACT_ACTION = "UPDATE_CONTACT_ACTION";
export const EDIT_CONTACT_ACTION = "EDIT_CONTACT_ACTION";

export function getContacts() {
  return (dispatch) => {
    dispatch({ type: LOADING_ACTION, payload: true });

    ContactsApi.get()
      .then((list) => {
        dispatch({ type: GET_LIST_ACTION, payload: list });
        dispatch({ type: LOADING_ACTION, payload: false });
      })
      .catch((err) => {
        dispatch({ type: ERROR_ACTION, payload: err?.message });
      });
  };
}

export function addContact(contactObj) {
  return (dispatch) => {
    ContactsApi.create(contactObj)
      .then((newContact) => {
        console.log(newContact);
        dispatch({ type: ADD_CONTACT_ACTION, payload: newContact });
      })
      .catch((err) => {
        dispatch({ type: ERROR_ACTION, payload: err?.message });
      });
  };
}

export function deleteContact(payload) {
  return (dispatch) => {
    ContactsApi.delete(payload)
      .then((deletedContact) => {
        dispatch({ type: DELETE_CONTACT_ACTION, payload: deletedContact.id });
      })
      .catch((err) => {
        dispatch({ type: ERROR_ACTION, payload: err?.message });
      });
  };
}

export function editContact(payload) {
  return { type: EDIT_CONTACT_ACTION, payload };
}

export function updateContact(id, contact) {
  return (dispatch) => {
    ContactsApi.update(id, contact)
      .then((updatedContact) => {
        dispatch({ type: UPDATE_CONTACT_ACTION, payload: updatedContact });
      })
      .catch((err) => {
        dispatch({ type: ERROR_ACTION, payload: err?.message });
      });
  };
}

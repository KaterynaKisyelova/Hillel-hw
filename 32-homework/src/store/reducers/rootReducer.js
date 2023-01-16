import {
  LOADING_ACTION,
  ERROR_ACTION,
  GET_LIST_ACTION,
  ADD_CONTACT_ACTION,
  DELETE_CONTACT_ACTION,
  UPDATE_CONTACT_ACTION,
  EDIT_CONTACT_ACTION,
} from "../actions/contacts";

const INITIAL_CONTACT = {};
const INITIAL_STATE = {
  contact: INITIAL_CONTACT,
  isLoading: false,
  error: "",
  contactsList: [],
};

export default function rootReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case LOADING_ACTION:
      return { ...state, isLoading: payload };
    case ERROR_ACTION:
      return { ...state, error: payload };
    case GET_LIST_ACTION:
      return { ...state, contactsList: payload };
    case ADD_CONTACT_ACTION:
      return {
        ...state,
        contactsList: [...state.contactsList, payload],
      };
    case DELETE_CONTACT_ACTION:
      return {
        ...state,
        contactsList: state.contactsList.filter(
          (contact) => contact.id !== payload
        ),
      };
    case EDIT_CONTACT_ACTION:
      return { ...state, contact: payload };
    case UPDATE_CONTACT_ACTION:
      return {
        ...state,
        contactsList: state.contactsList.map((contact) => {
          return contact.id === payload.id ? payload : contact;
        }),
        contact: INITIAL_CONTACT,
      };
    default:
      return state;
  }
}

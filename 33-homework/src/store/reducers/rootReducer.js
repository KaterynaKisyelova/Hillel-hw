import {
  LOADING_USERS_ACTION,
  LOADING_ALBUMS_ACTION,
  LOADING_PHOTOS_ACTION,
  ERROR_ACTION,
  GET_USERS_ACTION,
  GET_ALBUMS_ACTION,
  SET_USER_ID_ACTION,
  SET_ALBUM_ID_ACTION,
  GET_PHOTOS_ACTION,
} from "../actions/users";

const INITIAL_STATE = {
  areUsersLoading: false,
  areAlbumsLoading: false,
  arePhotosLoading: false,
  error: "",
  usersList: [],
  albumsList: [],
  photosList: [],
  userId: "0",
  albumId: "0",
};

export default function rootReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case LOADING_USERS_ACTION:
      return { ...state, areUsersLoading: payload };
    case LOADING_ALBUMS_ACTION:
      return { ...state, areAlbumsLoading: payload };
    case LOADING_PHOTOS_ACTION:
      return { ...state, arePhotosLoading: payload };
    case ERROR_ACTION:
      return { ...state, error: payload };
    case GET_USERS_ACTION:
      return { ...state, usersList: payload };
    case GET_ALBUMS_ACTION:
      return { ...state, albumsList: payload };
    case SET_USER_ID_ACTION:
      return { ...state, userId: payload };
    case GET_PHOTOS_ACTION:
      console.log(payload);
      return { ...state, photosList: payload };
    case SET_ALBUM_ID_ACTION:
      return { ...state, albumId: payload };
    default:
      return state;
  }
}

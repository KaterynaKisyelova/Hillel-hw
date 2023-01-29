import UsersApi from "./UsersApi";

export const LOADING_USERS_ACTION = "LOADING_USERS_ACTION";
export const LOADING_ALBUMS_ACTION = "LOADING_ALBUMS_ACTION";
export const LOADING_PHOTOS_ACTION = "LOADING_PHOTOS_ACTION";
export const ERROR_ACTION = "ERROR_ACTION";
export const GET_USERS_ACTION = "GET_USERS_ACTION";
export const GET_ALBUMS_ACTION = "GET_ALBUMS_ACTION";
export const SET_USER_ID_ACTION = "SET_USER_ID_ACTION";
export const GET_PHOTOS_ACTION = "GET_PHOTOS_ACTION";
export const SET_ALBUM_ID_ACTION = "SET_ALBUM_ID_ACTION";

export function getUsers() {
  return (dispatch) => {
    dispatch({ type: LOADING_USERS_ACTION, payload: true });

    UsersApi.fetchUsers()
      .then((list) => {
        dispatch({ type: GET_USERS_ACTION, payload: list });
        dispatch({ type: LOADING_USERS_ACTION, payload: false });
      })
      .catch((err) => {
        dispatch({ type: ERROR_ACTION, payload: err?.message });
      });
  };
}

export function getAlbums(id) {
  return (dispatch) => {
    dispatch({ type: LOADING_ALBUMS_ACTION, payload: true });

    UsersApi.fetchAlbums(id)
      .then((res) => {
        dispatch({ type: GET_ALBUMS_ACTION, payload: res });
        dispatch({ type: LOADING_ALBUMS_ACTION, payload: false });
      })
      .catch((err) => {
        dispatch({ type: ERROR_ACTION, payload: err?.message });
      });
  };
}

export function getPhotos(id) {
  return (dispatch) => {
    dispatch({ type: LOADING_PHOTOS_ACTION, payload: true });

    UsersApi.fetchPhotos(id)
      .then((res) => {
        dispatch({ type: GET_PHOTOS_ACTION, payload: res });
        dispatch({ type: LOADING_PHOTOS_ACTION, payload: false });
      })
      .catch((err) => {
        dispatch({ type: ERROR_ACTION, payload: err?.message });
      });
  };
}

export function setUserId(id) {
  return { type: SET_USER_ID_ACTION, payload: id };
}

export function setAlbumId(id) {
  return { type: SET_ALBUM_ID_ACTION, payload: id };
}

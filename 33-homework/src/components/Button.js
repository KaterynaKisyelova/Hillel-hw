import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";
import {
  getAlbums,
  getPhotos,
  setAlbumId,
  setUserId,
} from "../store/actions/users";

function Button({ children, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onBtnClick() {
    navigate(`${id}`);

    if (children === "Albums") {
      dispatch(setUserId(id));
      dispatch(getAlbums(id));
      return;
    }

    dispatch(setAlbumId(id));
    dispatch(getPhotos(id));
  }

  return (
    <button className={styles.btn} onClick={onBtnClick}>
      {children}
    </button>
  );
}

export default Button;

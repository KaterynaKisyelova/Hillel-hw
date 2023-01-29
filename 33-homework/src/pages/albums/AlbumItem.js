import React from "react";
import { Outlet } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./AlbumItem.module.css";

function AlbumItem({ album }) {
  return (
    <li className={styles.album}>
      <div className={styles.item}>
        <span>{album.title}</span>
        <Button id={`${album.id}`}>Photos</Button>
      </div>
      <Outlet context={{ currentAlbumId: album.id }} />
    </li>
  );
}

export default AlbumItem;

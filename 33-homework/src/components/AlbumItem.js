import React from "react";
import { Outlet } from "react-router-dom";
import Button from "./Button";

function AlbumItem({ album }) {
  return (
    <li>
      <span>{album.title}</span>
      <Button id={`${album.id}`}>Photos</Button>
      <Outlet context={{ currentAlbumId: album.id }} />
    </li>
  );
}

export default AlbumItem;

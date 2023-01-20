import React from "react";
import { Outlet } from "react-router-dom";
import Button from "./Button";

function UserItem({ user }) {
  return (
    <li id={user.id}>
      <span>{user.name}</span>
      <Button id={user.id}>Albums</Button>
      <Outlet context={{ currentUserId: user.id }} />
    </li>
  );
}

export default UserItem;

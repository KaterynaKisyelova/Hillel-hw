import React from "react";
import { Outlet } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./UserItem.module.css";

function UserItem({ user }) {
  return (
    <li id={user.id} className={styles.user}>
      <div className={styles.item}>
        <span>{user.name}</span>
        <Button id={user.id}>Albums</Button>
      </div>
      <Outlet context={{ currentUserId: user.id }} />
    </li>
  );
}

export default UserItem;

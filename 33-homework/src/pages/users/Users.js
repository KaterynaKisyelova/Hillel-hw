import React from "react";
import UserItem from "./UserItem";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import styles from "./Users.module.css";

function Users() {
  const { usersList, areUsersLoading, error } = useSelector((state) => state);

  return (
    <>
      {areUsersLoading ? <Message>Loading...</Message> : null}
      {error ? <Message error={error}>{error}</Message> : null}
      {!areUsersLoading && !error ? (
        <ul className={styles.users}>
          {usersList.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default Users;

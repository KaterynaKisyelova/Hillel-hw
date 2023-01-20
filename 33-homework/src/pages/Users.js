import React from "react";
import UserItem from "../components/UserItem";
import { useSelector } from "react-redux";

function Users() {
  const usersList = useSelector((state) => state.usersList);
  const areUsersLoading = useSelector((state) => state.areUsersLoading);

  return (
    <>
      {areUsersLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="list">
          {usersList.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
}

export default Users;

// UserRow.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { checkStatus, editUser, removeUser } from "./UserSlice";
import styles from "./ListUser.module.css";

function User({ user }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.listUser}>
      <div
        className={`${styles.userCard} ${user.status ? styles.success : ""}`}
      >
      
          <p>fullname: {user.fullname}</p>
          <p>email: {user.email}</p>
          <p>work: {user.work}</p>
      
        <input
          type="checkbox"
          checked={user.status}
          onChange={() => dispatch(checkStatus(user.id))}
        />
      </div>
      <div>
        <button onClick={() => dispatch(editUser(user.id))}>edit</button>
        <button onClick={() => dispatch(removeUser(user.id))}>remove</button>
      </div>
    </div>
  );
}

export default React.memo(User);

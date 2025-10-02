import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredUsers } from "./UserFilterSelector";
import { checkStatus, editUser, removeUser } from "./UserSlice";

export default function ListUser() {
  const dispatch = useDispatch();
  const users = useSelector(selectFilteredUsers);
console.log(users)
  return (
    <div className="container">
      {users.map((u) => (
        <div key={u.id} className={`userCard ${u.status ? "success" : ""}`}>
          <div className="formusers">
            <p>fullname: {u.fullname}</p>
            <p>email: {u.email}</p>
            <p>work: {u.work}</p>
          </div>

          <input
            type="checkbox"
            checked={u.status}
            onChange={() => dispatch(checkStatus(u.id))}
          />

          <div>
            <button onClick={() => dispatch(editUser(u.id))}>edit</button>
            <button onClick={() => dispatch(removeUser(u.id))}>remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

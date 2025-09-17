import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ListUser.module.css";
import { editUser } from "./UserSlice";
const ListUser = () => {
  const { users } = useSelector((store) => store.user);
  const dispatch =  useDispatch()
  return (
    <div>
      {users.map((value) => (
        <div key={value.id} className={styles.listUser}>
          <div className={styles.userName}>
            <p>fullname: {value.fullname}</p>
            <p>email: {value.email}</p>
            <p> id:{value.id}</p>
          </div>
          <div>
            <button onClick={() =>  dispatch(editUser(value.id))}>edit</button>
            <button>remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListUser;

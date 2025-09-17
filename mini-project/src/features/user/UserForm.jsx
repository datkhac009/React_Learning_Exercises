import { useDispatch, useSelector } from "react-redux";
import { addUser, newUser, setEmail, setFullname } from "./UserSlice";
import { useState } from "react";

const UserForm = () => {
  const { fullname, email, status, id ,isEditing} = useSelector(
    (store) => store.user
  );
  console.log("status:",isEditing)
  const dispatch = useDispatch();

   function handleSubmit(e) {
    e.preventDefault();
    if (!fullname.trim()) return;
    dispatch(newUser());              // <-- CHỈ GỌI newUser(), KHÔNG truyền { newUser: ... } hay hàm
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="addForm">
          <div className="fullname">
            <label>fullname</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => dispatch(setFullname(e.target.value))}
            />
          </div>
          <div className="email">
            <label>email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
          </div>
        </div>

        <button>{isEditing ? "Edit" : "AddUser"}</button>
      </form>
    </div>
  );
};

export default UserForm;

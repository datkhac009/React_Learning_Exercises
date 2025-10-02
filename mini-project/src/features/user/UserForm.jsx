import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  saveEdit,
  setEmail,
  setFilterWork,
  setFullname,
  setWork,
} from "./UserSlice";

const UserForm = () => {
  const { fullname, email, work, filterBy, isEditing } = useSelector(
    (store) => store.user
  );

  // console.log("status:",isEditing)
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullname.trim()) return;
    if (!isEditing) {
      dispatch(addUser(fullname.trim(), email.trim(), work.trim()));
    } else {
      dispatch(saveEdit(fullname.trim(), email.trim(), work.trim()));
    }
  }
  // console.log(fullname,email)
  return (
    <div className="container">
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
          <div className="work">
            <label>work</label>
            <input
              type="text"
              value={work}
              onChange={(e) => dispatch(setWork(e.target.value))}
            />
          </div>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <button type="submit">{!isEditing ? "Add" : "SaveEdit"}</button>
        </div>
      </form>

      <select
        className="select-option"
        onChange={(e) => dispatch(setFilterWork(e.target.value))}
      >
        <option value="alluser">AllUser</option>
        <option value="finished">Finished</option>
        <option value="nofinished">No Finished</option>
      </select>
    </div>
  );
};

export default UserForm;

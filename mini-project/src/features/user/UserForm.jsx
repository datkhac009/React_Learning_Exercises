import { useDispatch, useSelector } from "react-redux";
import {
  addListWork,
  saveEdit,
  setDeadline,
  setDescription,
  setFilterWork,
  setTitle,

} from "./UserSlice";

const UserForm = () => {
  const { title, description, deadline, isEditing } = useSelector(
    (store) => store.user
  );

  // console.log("status:",isEditing)
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    if (!isEditing) {
      dispatch(addListWork(title.trim(), description.trim(), deadline.trim()));
    } else {
      dispatch(saveEdit(title.trim(), description.trim(), deadline.trim()));
    }
  }
  // console.log(fullname,email)
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="addForm">
          <div className="fullname">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
            />
          </div>
          <div className="email">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => dispatch(setDescription(e.target.value))}
            />
          </div>
          <div className="work">
            <label>Deadline</label>
            <input
              type="time"
              value={deadline}
              onChange={(e) => dispatch(setDeadline(e.target.value))}
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

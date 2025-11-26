import { useDispatch, useSelector } from "react-redux";
import "./styleForm.css";
import {
  addListWork,
  saveEdit,
  setDeadline,
  setDescription,
  setStatus,
  setTitle,
} from "./WorkSlice";

const UserForm = () => {
  const { title, description, deadline, isEditing, statusWork } = useSelector(
    (store) => store.user
  );

  // console.log("status:",isEditing)
  const dispatch = useDispatch();
  const todayStr = new Date().toISOString().split("T")[0]; //split() tách chuỗi thành 1 mảng

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    if (!isEditing) {
      dispatch(addListWork(title.trim(), description.trim(), deadline.trim()));
    } else {
      dispatch(
        saveEdit(title.trim(), description.trim(), deadline.trim(), statusWork)
      );
    }
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-input"
              value={description}
              onChange={(e) => dispatch(setDescription(e.target.value))}
              placeholder="Enter task description"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Deadline</label>
            <input
              type="date"
              className="form-input"
              value={deadline}
              min={todayStr}
              max="9999-12-31"
              onChange={(e) => dispatch(setDeadline(e.target.value))}
              required
            />
          </div>

          {isEditing && (
            <div className="form-field">
              <label className="form-label">Status Work</label>
              <select
                className="form-select"
                value={statusWork}
                onChange={(e) => dispatch(setStatus(e.target.value))}
              >
                <option value="Haven't started yet">Haven't started yet</option>
                <option value="Working">Working</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">
            {!isEditing ? "Add Work" : "Save Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

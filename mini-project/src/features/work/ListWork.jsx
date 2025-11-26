import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredDeadLineStatus } from "./filter/FilterDeadlineAndStatusSelector";
import { editListWork, removeWork } from "./WorkSlice";
import { formatDate } from "../../utils/date";

export default function ListWork() {
  const dispatch = useDispatch();
  const work = useSelector(selectFilteredDeadLineStatus);
  return (
    <div className="container">
      {work.map((u) => (
        <div key={u.id} className={`userCard ${u.status ? "success" : ""}`}>
          <div className="formusers">
            <p>Title: {u.title}</p>
            <p>Description: {u.description}</p>
            <p>Deadline: {formatDate(u.deadline)}</p>
            <p>Status Work: {u.statusWork}</p>
          </div>

          <div>
            <button onClick={() => dispatch(editListWork(u.id))}>edit</button>
            <button onClick={() => dispatch(removeWork(u.id))}>remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

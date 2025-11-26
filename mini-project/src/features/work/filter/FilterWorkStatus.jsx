import { useDispatch, useSelector } from "react-redux";
import { setFilterStatusWork } from "../WorkSlice";

function FilterWorkStatus() {
  const dispatch = useDispatch();
  const filterStatusWork = useSelector((state) => state.user.filterStatusWork);

  return (
    <div className="">
      <select
        defaultValue={filterStatusWork}
        onChange={(e) => dispatch(setFilterStatusWork(e.target.value))}
      >
        <option value="All Status">All Status</option>
        <option value="Haven't started yet">Haven't started yet</option>
        <option value="Working">Working</option>
        <option value="Complete">Complete</option>
      </select>
    </div>
  );
}

export default FilterWorkStatus;

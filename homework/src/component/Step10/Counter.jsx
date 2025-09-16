import { useDispatch, useSelector } from "react-redux";
import { increase, reduce } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.count.counter);
  const dispatch = useDispatch();

  return (
    <>
      <h2>Counter RTK</h2>
      <button onClick={() => dispatch(increase())}>+</button>
      <div>{count}</div>
      <button onClick={() => dispatch(reduce())}>-</button>
    </>
  );
}

export default Counter;

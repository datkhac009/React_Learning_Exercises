import useCounter from "./hook/useCounter";
function App_v7() {
  const {count , decrease  , increase , reset} = useCounter({counter : 0});
  return <div>

    <p><button onClick={decrease}>-</button> {count} <button onClick={increase}>+</button></p>
    <button onClick={reset}>Reset</button>
  </div>;
}

export default App_v7;

import { useState } from "react";
import Status from "./Status";
import './style.css'
const User = [
  {
    statusName: "Đi tập gym",
    done: true,
  },
  {
    statusName: "Học code",
    done: false,
  },
];
function App_v2() {
  const [users, setUsers] = useState(User);

  function handleStatus(statusName) {
    console.log(statusName)
    //Trường hơp này thì vẫn đúng những mà phải có id thì mới có thể single toggle statusName
    // setUsers(users.map((prev)=>(prev.status !== done ? {...prev, done: !prev.done} : prev)))
    setUsers(
      users.map((prev) => (prev.statusName === statusName ? { ...prev, done: !prev.done } : prev))
    );
  }
  return (
    <div>
      <h1>Todo Done</h1>
      {users.map((user, index) => {
        return <Status key={index}  user={user} handleStatus={handleStatus} />;
      })}
    </div>
  );
}

export default App_v2;

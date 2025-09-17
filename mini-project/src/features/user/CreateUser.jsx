import { useState } from "react";
import ListUser from "./ListUser";
import UserForm from "./UserForm";
import { useSelector } from "react-redux";

const user = [
  { 
    id:1,
    fullname: "Nguyen khac dat",
    email: "datkhac@gmail.com",
    status: false,
  },
  {
    id:2,
    fullname: "Nguyen khac hieu",
    email: "dathieu@gmail.com",
    status: true,
  },
];
function CreateUser() {
  const [users, setUsers] = useState(user);
 const userName =  useSelector((store) => store.user.fullname);

  return (
    <>
      <div>
        <h1>Create User: {userName}</h1>
        <ListUser user = {users}/>
        <UserForm />
      </div>
      
    </>
  );
}

export default CreateUser;

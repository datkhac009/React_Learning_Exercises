import ListUser from "./ListUser";
import UserForm from "./UserForm";

function CreateUser() {
  return (
    <div className="container">
      <h1>Form Manage Work</h1>
      <div className="formUser">
        <ListUser />
        <UserForm />
      </div>
    </div>
  );
}

export default CreateUser;

import ListWork from "./ListWork";
import WorkForm from "./WorkForm";

function CreateUser() {
  return (
    <div>
      <h1>Form Manage Work</h1>
      <div className="formUser">
        <ListWork />
        <WorkForm />
      </div>
    </div>
  );
}

export default CreateUser;

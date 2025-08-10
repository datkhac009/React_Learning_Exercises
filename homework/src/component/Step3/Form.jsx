import { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
    };
  
    setUsers(newUser);
    setName("");
    setEmail("");
  }
  console.log(users)
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Submit</button>
      </form><br/>
      <main>
        <div>Table User</div>
        {users && (
          <>
            <ul>
              <li>Full Name: {users.name}</li>
              <li>Emai: {users.email}</li>
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Form;

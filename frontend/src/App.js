import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "YOUR_API_URL/registerUser";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  const createUser = async () => {
    await axios.post(API_URL, { email, password });
    fetchUsers();
  };

  const updateUser = async () => {
    await axios.put(API_URL, { email, password });
    fetchUsers();
  };

  const deleteUser = async (email) => {
    await axios.delete(API_URL, { data: { email } });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>User Dashboard</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br/><br/>

      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br/><br/>

      <button onClick={createUser}>Create</button>
      <button onClick={updateUser}>Update</button>

      <hr/>

      {users.map((u) => (
        <div key={u.email}>
          <p>{u.email} - {u.password}</p>
          <button onClick={() => deleteUser(u.email)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

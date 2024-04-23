import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegiseter() {
    try {
      const { data: token } = await axios.post("/auth/login", {
        name,
        email,
        password,
      });
      window.localStorage.setItem("TOKEN", token.token);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h2>Register</h2>
      <div>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegiseter}>Register</button>
      </div>
    </div>
  );
}
export default Register;

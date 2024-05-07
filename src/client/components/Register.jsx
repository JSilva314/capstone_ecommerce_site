import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(setToken) {
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    console.log(email, password);
    try {
      const { data: token } = await axios.post("/api/users/register", {
        email,
        password,
      });
      console.log(token);
      window.localStorage.setItem("TOKEN", token.token);
      setToken(token.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h2>Register</h2>
      <div>
        {/* <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
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
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
export default Register;

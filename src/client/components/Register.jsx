import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

function Register({ setToken }) {
  const navigate = useNavigate();
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
      localStorage.setItem("TOKEN", token.token);
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
        <TextField
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </div>
  );
}
export default Register;

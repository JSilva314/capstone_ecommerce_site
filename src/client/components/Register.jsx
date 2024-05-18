import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

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

  const commonStyles = { height: 56, mb: 2 };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h2>Register</h2>
      <Box width="300px" display="flex" flexDirection="column" gap={2}>
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
        />
        <TextField
          type="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
        />
        <Button
          variant="contained"
          onClick={handleRegister}
          fullWidth
          sx={commonStyles}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default Register;

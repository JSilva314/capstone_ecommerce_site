import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Register({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);


  async function handleRegister() {
   

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordMinLength = 8;
      const passwordRegex =
        /^(?=.*[a-z])(?=(?:.*[A-Z]){2,})(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
      const phoneRegex = /^[0-9]{10}$/;
      const usernameRegex = /^[a-zA-Z0-9_]+$/; // Username can only contain letters, numbers, and underscores

      if (!email || !emailRegex.test(email)) {
        toast.error("Invalid email address");
        return;
      }

      if (
        !password ||
        password.length < passwordMinLength ||
        !passwordRegex.test(password)
      ) {
        toast.error(
          "Password must be at least 8 characters long, contain at least 2 capital letters, 1 lowercase letter, and 1 special character."
        );
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      if (!fullName) {
        toast.error("Full name is required");
        return;
      }

      
      if (!username || !usernameRegex.test(username)) {
        toast.error(
          "Username must contain only letters, numbers, and underscores"
        );
        return;
      }

      if (!address) {
        toast.error("Address is required");
        return;
      }

      const response = await axios.post("/api/users/register", {
        email,
        password,
        phoneNumber,
        fullName,
        username,
        address,
      });

      if (response.status === 201) {
        const token = response.data;
        
        toast.success("User Registered Successfully");
        localStorage.setItem("TOKEN", token.token);
        setToken(token.token);
        navigate("/");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        console.error(error);
        toast.error("User Already Exists.");
      }
    }
  }

  const commonStyles = { height: 56, mb: 2 };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <h2>Register</h2>
      <Box width="300px" display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Full Name"
          placeholder="First and Last name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
        />
        <TextField
          label="Username"
          placeholder="No Special Characters"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
        />
        <TextField
          label="Full Address"
          placeholder="123 May St, San Diego, CA, 62704"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
        />
        <TextField
          label="Phone Number"
          placeholder="Optional"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
        />
        <TextField
          label="E-mail"
          placeholder="johndoe@icloud.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontStyle: "italic", fontSize: "0.650rem", mt: "-8px", mb: 1 }}
        >
          Password must be at least 8 characters long, contain at least 2
          capital letters, 1 lowercase letter, and 1 special character.
        </Typography>
        <TextField
          label="Re-enter Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={commonStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          onClick={handleRegister}
          fullWidth
          sx={commonStyles}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
}

export default Register;

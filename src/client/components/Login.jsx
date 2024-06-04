import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { keyframes } from "@emotion/react";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  async function handleLogin() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailError(false);
    setPasswordError(false);

    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      toast.error("Incorrect email or password.");
      return;
    }

    try {
      const { data: token } = await axios.post("/api/users/login", {
        email,
        password,
      });
      window.localStorage.setItem("TOKEN", token.token);
      setToken(token.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setPasswordError(true);
      toast.error("Incorrect email or password.");
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const traceAnimation = keyframes`
    0% {
      border: 2px solid transparent;
      box-shadow: 0 0 5px rgba(36, 26, 92, 0.3), 0 0 10px rgba(36, 26, 92, 0.3), 0 0 20px rgba(36, 26, 92, 0.3), 0 0 40px rgba(36, 26, 92, 0.3), 0 0 60px rgba(36, 26, 92, 0.3);
    }
    100% {
      border: 2px solid rgba(36, 26, 92, 0.3);
      box-shadow: 0 0 5px rgba(36, 26, 92, 0), 0 0 10px rgba(36, 26, 92, 0), 0 0 20px rgba(36, 26, 92, 0), 0 0 40px rgba(36, 26, 92, 0), 0 0 60px rgba(36, 26, 92, 0);
    }
  `;

  const commonStyles = { height: 56, mb: 2 };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "90vh", mt: -26 }}
    >
      <Helmet>
        <title>CarMin Sign-In</title>
        <meta
          name="description"
          content="Login to access your account and manage your orders."
        />
      </Helmet>
      <Box
        width="300px"
        display="flex"
        flexDirection="column"
        gap={2}
        p={4}
        border="2px solid transparent"
        borderRadius={2}
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"
        bgcolor="background.paper"
        alignItems="center"
        sx={{
          position: "relative",
          animation: `${traceAnimation} 20s linear infinite`,
        }}
      >
        <Typography
          variant="h4"
          mb={2}
          sx={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
          }}
        >
          Login
        </Typography>
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          fullWidth
          error={emailError}
          sx={{
            ...commonStyles,
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          fullWidth
          error={passwordError}
          sx={{
            ...commonStyles,
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
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
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          sx={commonStyles}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Login;

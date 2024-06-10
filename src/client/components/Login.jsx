import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Divider,
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
      toast.error("Incorrect email format.");
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
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("email")) {
          setEmailError(true);
          toast.error("Email not found. Please check your email address.");
        } else if (errorMessage.includes("password")) {
          setPasswordError(true);
          toast.error("Incorrect password. Please try again.");
        } else {
          setEmailError(true);
          setPasswordError(true);
          toast.error("Incorrect email or password.");
        }
      } else {
        setEmailError(true);
        setPasswordError(true);
        toast.error("Login failed. Please try again later.");
      }
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

  const slideInAnimation = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  `;

  const commonStyles = { height: 56, mb: 1 };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "90vh",
        mt: -26,
        backgroundImage: `url("/background.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
          mb={1} // Reduce margin bottom to bring the texts closer
          sx={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            color: "#241A5C",
            animation: `${slideInAnimation} 1s ease-in-out`,
          }}
        >
          Welcome
        </Typography>
        <Typography
          variant="body1"
          mb={2}
          sx={{
            fontFamily: "Raleway, sans-serif",
            mt: -1, // Negative margin top to bring this text closer to "Welcome"
            color: "#6D6D6D", // Darker grey color
            animation: `${slideInAnimation} 1s ease-in-out`,
          }}
        >
          Sign-In to Use your CarMin Account
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

        <Link to="/forgot-password" style={{ textDecoration: "none" }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{
              fontWeight: "bold",
              fontFamily: "Raleway, sans-serif",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            Forgot password?
          </Typography>
        </Link>
        <Divider sx={{ width: "100%", mt: 2, mb: 2 }} />
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to="/register"
          sx={{
            ...commonStyles,
            mt: 1,
            backgroundColor: "#00bc26",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#26e239",
            },
          }}
        >
          Create New Account
        </Button>
      </Box>
    </Box>
  );
}

export default Login;

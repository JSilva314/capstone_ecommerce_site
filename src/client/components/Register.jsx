import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import { keyframes } from "@emotion/react";

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

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  async function handleRegister() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 8;
    const passwordRegex =
      /^(?=.*[a-z])(?=(?:.*[A-Z]){2,})(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Username can only contain letters, numbers, and underscores
    const addressRegex = /^(.+),\s*(.+),\s*([A-Z]{2}),\s*(\d{5})$/; // Address format regex

    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setFullNameError(false);
    setUsernameError(false);
    setAddressError(false);

    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      toast.error("Invalid email address");
      return;
    }

    if (
      !password ||
      password.length < passwordMinLength ||
      !passwordRegex.test(password)
    ) {
      setPasswordError(true);
      toast.error(
        "Password must be at least 8 characters long, contain at least 2 capital letters, 1 lowercase letter, and 1 special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      toast.error("Passwords do not match");
      return;
    }

    if (!fullName) {
      setFullNameError(true);
      toast.error("Full name is required");
      return;
    }

    if (!username || !usernameRegex.test(username)) {
      setUsernameError(true);
      toast.error(
        "Username must contain only letters, numbers, and underscores"
      );
      return;
    }

    if (!address) {
      setAddressError(true);
      toast.error("Address is required");
      return;
    }

    const addressMatch = address.match(addressRegex);
    if (!addressMatch) {
      setAddressError(true);
      toast.error(
        "Address must be in the format: 123 May St, San Diego, CA, 62704"
      );
      return;
    }

    const [fullAddress, street, city, state, zipCode] = addressMatch;

    try {
      const response = await axios.post("/api/users/register", {
        email,
        password,
        phoneNumber,
        fullName,
        username,
        address: fullAddress,
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

  const handleDialogOpen = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogContent("");
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

  const commonStyles = { height: 56, mb: 2 };

  const passwordValid =
    password.length >= 8 &&
    /^(?=.*[a-z])(?=(?:.*[A-Z]){2,})(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
      password
    );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("/Registerbackground.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        mt: -8, // Adjust this value to bring the form higher
      }}
    >
      <Helmet>
        <title>CarMin Sign-Up</title>
        <meta
          name="description"
          content="Register to create a new account and start managing your orders."
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
          animation: `${traceAnimation} 20s linear infinite`,
        }}
      >
        <Typography
          variant="h4"
          mb={1}
          sx={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            color: "#241A5C",
            animation: `${slideInAnimation} 1s ease-in-out`,
          }}
        >
          Sign Up
        </Typography>
        <Typography
          variant="body1"
          mb={2}
          sx={{
            fontFamily: "Raleway, sans-serif",
            mt: -1,
            color: "#6D6D6D",
            animation: `${slideInAnimation} 1s ease-in-out`,
          }}
        >
          It's quick and easy.
        </Typography>
        <TextField
          label="Full Name"
          placeholder="First and Last name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          variant="outlined"
          fullWidth
          error={fullNameError}
          sx={{
            ...commonStyles,
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
        />
        <TextField
          label="Username"
          placeholder="No Special Characters"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          fullWidth
          error={usernameError}
          sx={{
            ...commonStyles,
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
        />
        <TextField
          label="Full Address"
          placeholder="123 May St, San Diego, CA, 62704"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          fullWidth
          error={addressError}
          sx={{
            ...commonStyles,
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
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
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          error={passwordError}
          onFocus={() => setPasswordFocused(true)}
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
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            fontSize: "0.700rem",
            mt: "-8px",
            mb: 1,
            color: passwordFocused
              ? passwordValid
                ? "green"
                : "red"
              : "textSecondary",
          }}
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
          error={confirmPasswordError}
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
          sx={{
            ...commonStyles,
            animation: "pulse 20s infinite",
            "@keyframes pulse": {
              "0%": {
                transform: "scale(1)",
              },
              "50%": {
                transform: "scale(1.05)",
              },
              "100%": {
                transform: "scale(1)",
              },
            },
          }}
        >
          Create Account
        </Button>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          By creating an account, you agree to CarMin's{" "}
          <Link
            href="#"
            onClick={() =>
              handleDialogOpen(
                "Condition of Use: Your use of CarMin is subject to our conditions. Please utilize this application in order to simulate an efficient car purchasing experience, we utilize stripe as the payment processor with a test environment. Please use card # 4242 4242 4242 during checkout on Stripe portal; all other card information can be fake."
              )
            }
            underline="hover"
          >
            Condition of Use
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            onClick={() =>
              handleDialogOpen(
                "Privacy Notice: Your privacy is important to us. We do not retain the account information, it is held on Render and will be deleted within 90 days of our trial period within this deployment platform."
              )
            }
            underline="hover"
          >
            Privacy Notice
          </Link>
          .
        </Typography>
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Register;

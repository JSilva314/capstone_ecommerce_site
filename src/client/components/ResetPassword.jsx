import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const passwordMinLength = 8;
  const passwordRegex =
    /^(?=.*[a-z])(?=(?:.*[A-Z]){2,})(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    if (code) {
      setVerificationCode(code);
    } else {
      navigate("/forgot-password");
    }

    const validateToken = async () => {
      try {
        await axios.get(`/api/password-reset/validate-token/${token}`);
        setIsValidToken(true);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(
            "Invalid or expired token. Please request a new password reset."
          );
          navigate("/forgot-password");
        } else {
          toast.error("Error validating token");
        }
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token, navigate, location.search]);

  const handleResetPassword = async () => {
    setPasswordError(false);
    setConfirmPasswordError(false);

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

    try {
      const response = await axios.post(
        `/api/password-reset/reset-password/${token}`,
        {
          password,
          verificationCode,
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(
          "Password reset link has expired, Please request a new password reset!"
        );
        navigate("/forgot-password");
      } else {
        toast.error("Error resetting password");
      }
    }
  };

  if (!isValidToken) {
    return null; // Or a loading spinner / message if you want
  }

  const isPasswordValid =
    password.length >= passwordMinLength && passwordRegex.test(password);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "90vh" }}
    >
      <Helmet>
        <title>CarMin - Reset Password</title>
        <meta name="description" content="Reset your password." />
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
      >
        <Typography
          variant="h4"
          mb={2}
          sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
        >
          Reset Password
        </Typography>
        <TextField
          label="New Password"
          type={showPassword ? "text" : "password"}
          placeholder="Create Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (!isTyping) setIsTyping(true);
          }}
          variant="outlined"
          fullWidth
          error={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
        />
        <Typography
          variant="body2"
          color={
            isTyping ? (isPasswordValid ? "green" : "red") : "textSecondary"
          }
          sx={{ fontStyle: "italic", fontSize: "0.650rem", mt: "-8px", mb: 1 }}
        >
          Password must be at least 8 characters long, contain at least 2
          capital letters, 1 lowercase letter, and 1 special character.
        </Typography>
        <TextField
          label="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          fullWidth
          error={confirmPasswordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
        />
        <Button variant="contained" onClick={handleResetPassword} fullWidth>
          Reset Password
        </Button>
      </Box>
    </Box>
  );
}

export default ResetPassword;
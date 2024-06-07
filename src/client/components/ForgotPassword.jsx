import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      await axios.post("/api/password-reset/forgot-password", { email });
      toast.success("Password reset link sent to your email");
    } catch (error) {
      console.error("Error sending password reset link:", error);
      toast.error("Error sending password reset link");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "90vh" }}
    >
      <Helmet>
        <title>Forgot Password</title>
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
          Forgot Password
        </Typography>
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" onClick={handleForgotPassword} fullWidth>
          Reset Password
        </Button>
      </Box>
    </Box>
  );
}

export default ForgotPassword;

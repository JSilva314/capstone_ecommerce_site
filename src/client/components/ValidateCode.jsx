import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

function ValidateCode() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("/api/password-reset/verify-code", {
        token,
        verificationCode,
      });
      toast.success(response.data.message);
      navigate(`/reset-password/${token}?code=${verificationCode}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid or expired verification code. Please request a new password reset link.");
      } else {
        toast.error("Error verifying code");
      }
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
        <title>Verify Code</title>
        <meta name="description" content="Verify your code." />
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
          Verify Code
        </Typography>
        <TextField
          label="Verification Code"
          placeholder="Enter Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" onClick={handleVerifyCode} fullWidth>
          Validate Code
        </Button>
      </Box>
    </Box>
  );
}

export default ValidateCode;

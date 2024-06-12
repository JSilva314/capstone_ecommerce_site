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
        toast.error(
          "Invalid or expired verification code. Please request a new password reset link."
        );
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
      sx={{
        minHeight: "90vh",
        backgroundImage: `url("/ValidateCode.jpg")`, // Set the path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
        textAlign="center"
      >
        <img
          src="/greencheckmark.png"
          alt="Checkmark Icon"
          style={{ width: "100px", height: "100px", marginBottom: "6px" }}
        />
        <Typography
          variant="h5"
          mb={1} 
          sx={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 600,
            animation: `shine 6s infinite`,
            "@keyframes shine": {
              "0%": { color: "black" },
              "50%": { color: "green" },
              "100%": { color: "black" },
            },
          }}
        >
          Verify Code
        </Typography>
        <Typography
          variant="h8"
          mb={1} 
          sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
        >
          Please check your email for your verification code and input here:
        </Typography>
        <TextField
          label="Verification Code"
          placeholder="Enter Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }} 
        />
        <Button
          variant="contained"
          onClick={handleVerifyCode}
          fullWidth
          sx={{ borderRadius: "20px" }}
        >
          Validate Code
        </Button>
      </Box>
    </Box>
  );
}

export default ValidateCode;

import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Modal } from "@mui/material";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      await axios.post("/api/password-reset/forgot-password", { email });
      toast.success("Password reset link sent to your email");
      setOpen(true); // Open the modal
    } catch (error) {
      console.error("Error sending password reset link:", error);
      if (error.response && error.response.status === 404) {
        toast.error("Email not found. Please check the email spelling.");
      } else {
        toast.error("Error sending password reset link");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "90vh",
        mt: -26,
        backgroundImage: `url("/PasswordReset.jpg")`, // Set the path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Helmet>
        <title>CarMin - Forgot Password</title>
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
        textAlign="center"
      >
        <img
          src="/lock.png"
          alt="Lock Icon"
          style={{ width: "120px", height: "120px", marginBottom: "6px" }}
        />
        <Typography
          variant="h5"
          mb={2}
          sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
        >
          Trouble Logging In?
        </Typography>
        <Typography
          variant="h8"
          mb={2}
          sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
        >
          Enter your email and we'll send a link to get you back into your
          account.
        </Typography>
        <TextField
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleForgotPassword}
          fullWidth
          sx={{ borderRadius: "20px" }}
        >
          Send Reset Password Link
        </Button>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="forgot-password-modal-title"
        aria-describedby="forgot-password-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: "0 0 20px 4px rgba(144, 238, 144, 0.8)", // Apply green box shadow
            p: 4,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <img
              src="/customer-service.png"
              alt="Success"
              style={{ width: 50, height: 50 }}
            />
            <Typography
              id="forgot-password-modal-title"
              variant="h6"
              component="h2"
              mt={2}
            >
              Reset Password Link Sent!
            </Typography>
            <Typography id="forgot-password-modal-description" sx={{ mt: 2 }}>
              Please check your email and follow the instructions.
            </Typography>
            <Button onClick={handleClose} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ForgotPassword;

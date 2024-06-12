import React, { useState, useEffect } from "react";
import GoogleTranslate from "./GoogleTranslate";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { keyframes } from "@emotion/react";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleDialogOpen = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogContent("");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("TOKEN");
      try {
        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmail(response.data.email);
        setUsername(response.data.username);
        setAddress(response.data.address);
        setPhone(response.data.phone);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("TOKEN");
      const updateData = {};
      if (email) updateData.email = email;
      if (username) updateData.username = username;
      if (address) updateData.address = address;
      if (phone) updateData.phone = phone;
  
      const response = await axios.put("/api/users/update", updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        toast.success("User information updated successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error updating user information.");
        console.error("Error updating user information:", error);
      }
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

  const commonStyles = { height: 56, mb: 2 };

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
        mt: -8,
      }}
    >
      <Helmet>
        <title>CarMin Account Settings</title>
        <meta name="description" content="Update your account settings." />
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
          Account Settings
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Email Address"
            placeholder="johndoe@icloud.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            fullWidth
            sx={commonStyles}
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2} // Adjust padding as needed
          >
            <GoogleTranslate />
          </Box>
          <Button
            type="submit"
            variant="contained"
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
              backgroundColor: "#15379b",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#0d2357",
              },
            }}
          >
            Update
          </Button>
        </form>
        {message && (
          <Typography variant="body1" sx={{ color: "red", marginTop: 2 }}>
            {message}
          </Typography>
        )}
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
};

export default Settings;

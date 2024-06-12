import React, { useState } from "react";
import GoogleTranslate from "./GoogleTranslate";
import axios from "axios";
import { Box, Container, Typography, Card, CardContent, Button } from "@mui/material";

const Settings = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("TOKEN"); // Retrieve the authentication token from localStorage
      const response = await axios.put(
        "/api/users/update",
        {
          fullName,
          username,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authentication token in the request headers
          },
        }
      );
      if (response.status === 200) {
        setMessage("User information updated successfully!");
      }
    } catch (error) {
      setMessage("Error updating user information.");
      console.error("Error updating user information:", error);
    }
 };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/car2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#491A93",
          borderRadius: 4,
          padding: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h1" 
          sx={{ 
            marginBottom: 4,
            color: "#EFF1F3",
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            textTransform: "uppercase",

         }}>Account Settings</Typography>
        <form onSubmit={handleUpdate}>
          <Card
            sx={{
              border: "none",
              borderRadius: 1.5,
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.05)",
              },
              marginBottom: 2,
            }}
          >
            <CardContent>
              <div>
                <label>
                  <Typography variant="subtitle1">Full Name:</Typography>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  <Typography variant="subtitle1">Username:</Typography>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  <Typography variant="subtitle1">Address:</Typography>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </label>
              </div>
              <GoogleTranslate />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#15379b",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#0d2357",
                  },
                  width: "100%",
                }}
              >
                Update
              </Button>
            </CardContent>
          </Card>
        </form>
        {message && (
          <Typography variant="body1" sx={{ color: "white", marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Settings;

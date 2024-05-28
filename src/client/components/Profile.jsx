import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("TOKEN");
        if (!token) {
          setError("No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        setProfile(response.data);
      } catch (error) {
        setError("Error fetching profile. Please try again.");
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
        <Alert severity="warning">Profile not found.</Alert>
      </Container>
    );
  }

  // Extract initials from full name
  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names[0][0] + (names[1] ? names[1][0] : "");
    return initials.toUpperCase();
  };

  return (
    <Container>
      <Box my={4} display="flex" justifyContent="center">
        <Card sx={{ maxWidth: 600, boxShadow: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 3,
            }}
          >
            <Avatar
              alt={profile.fullName}
              src="/path/to/profile/image.jpg"
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            >
              {getInitials(profile.fullName)}
            </Avatar>
            <Typography variant="h4" gutterBottom>
              {profile.fullName}
            </Typography>
          </Box>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Username:
                </Typography>
                <Typography variant="body1">{profile.username}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Email:
                </Typography>
                <Typography variant="body1">{profile.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Address:
                </Typography>
                <Typography variant="body1">{profile.address}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Phone:
                </Typography>
                <Typography variant="body1">
                  {profile.phone || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Profile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }

        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Profile fetched:', response.data); // Log fetched data
        setProfile(response.data);
      } catch (error) {
        setError('Error fetching profile. Please try again.');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
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

  return (
    <Container>
      <Box my={4} display="flex" justifyContent="center">
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            height="140"
            image=""
            alt=""
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Typography variant="h6">Full Name: {profile.fullName}</Typography>
            <Typography variant="h6">Username: {profile.username}</Typography>
            <Typography variant="h6">Email: {profile.email}</Typography>
            <Typography variant="h6">Address: {profile.address}</Typography>
            <Typography variant="h6">Phone: {profile.phone || 'N/A'}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Profile;
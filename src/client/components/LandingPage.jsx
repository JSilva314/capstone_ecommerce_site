// src/components/LandingPage.js

import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const cars = [
  {
    title: "Car 1",
    description: "Description for Car 1",
    image: "/images/car1.jpg", // Make sure these images exist in the public/images folder
  },
  {
    title: "Car 2",
    description: "Description for Car 2",
    image: "/images/car2.jpg",
  },
  {
    title: "Car 3",
    description: "Description for Car 3",
    image: "/images/car3.jpg",
  },
];

const LandingPage = () => {
  return (
    <Box
      className="poppins-semibold"
      sx={{
        height: "100vh",
        backgroundImage: `url('/background.jpg')`, // Ensure this image exists in the public/images folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "black",
        p: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Car Dealership
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Find your dream car with us.
        </Typography>
      </Container>
    </Box>
  );
};

export default LandingPage;

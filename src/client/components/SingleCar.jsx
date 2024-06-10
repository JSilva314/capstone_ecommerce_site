import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

function SingleCar({ user }) {
  const { id } = useParams();
  const [car, setCar] = useState({});

  useEffect(() => {
    async function getCar() {
      try {
        const { data: foundCar } = await axios.get(`/api/cars/${id}`);
        setCar(foundCar);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to fetch car details.");
      }
    }
    getCar();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("TOKEN");

    if (!user || !user.id) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }
  
    try {
      await axios.post(
        `/api/cart`,
        {
          carId: car.id,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item added to cart successfully");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Car already exists in your cart.");
        } else {
          toast.error("Failed to add car to cart. Please try again.");
        }
        console.error("Error status:", error.response.status);
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("Failed to add car to cart. Please check your network.");
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 5,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div" sx={{ mb: 2 }}>
          {car.make} {car.model}
        </Typography>
        <CardMedia
          component="img"
          height="300"
          image={car.image}
          alt={`${car.make} ${car.model}`}
          sx={{ mb: 2, borderRadius: 1 }}
        />
        <Typography variant="body1" component="div">
          <strong>Used/New:</strong> {car.newUsed ? "New" : "Used"}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Color:</strong> {car.color}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Year:</strong> {car.year}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Vehicle Type:</strong> {car.bodyType}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Price:</strong> ${car.price}
        </Typography>
        <Typography variant="body1" component="div">
          <strong>Vin #:</strong> {car.vin}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          <strong>Miles:</strong> {car.miles}
        </Typography>
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SingleCar;

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

function SingleOrderCar({ user }) {
  const { id } = useParams();
  const [car, setCar] = useState({});
  console.log(car);

  useEffect(() => {
    async function getCar() {
      try {
        const { data: foundCar } = await axios.get(`/api/cars/${id}`);
        setCar(foundCar);
        console.log(foundCar);
      } catch (error) {
        console.error(error);
      }
    }
    getCar();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(`/api/cart`, {
        carId: car.id,
        userId: user.id,
      });
      console.log("Item added to cart successfully");
      toast.success("Item added to cart successfully");
    } catch (error) {
      if (error.response) {
        toast.error("Car already exists in your Cart");
        console.error("Error status:", error.response.status);
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
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
      </CardContent>
    </Card>
  );
}

export default SingleOrderCar;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function SingleCar({ user }) {
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
  }, []);
  const handleAddtoCart = async () => {
    try {
      await axios.post(`/api/cart`, {
        carId: car.id,
        userId: user.id,
      });
      console.log("Item added to cart successfully");
      toast.success("Item added to cart successfully");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error("Car already exists in your Cart");
        console.error("Error status:", error.response.status);
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div style={{ border: "2px solid black" }}>
      <h3>Make: {car.make}</h3>
      <h3>Model: {car.model}</h3>
      <h3>Used/New: {car.newUsed ? "Yes" : "No"}</h3>
      <h3>Color: {car.color}</h3>
      <h3>Year: {car.year}</h3>
      <h3>Vehicle Type: {car.bodyType}</h3>
      <h3>Image: {car.image}</h3>
      <h3>Price: ${car.price}</h3>
      <h3>Vin #: {car.vin}</h3>
      <button onClick={() => handleAddtoCart()}>Add to Cart</button>
    </div>
  );
}
export default SingleCar;

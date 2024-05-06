import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleCar() {
  const { id } = useParams();
  const [car, setCar] = useState({});

  useEffect(() => {
    async function getCar() {
      try {
        const { data: foundCar } = await axios.get(`/api/cars/${id}`);
        setCar(foundCar);
      } catch (error) {
        console.error(error);
      }
    }
    getCar();
  }, []);

  return (
    <div style={{ border: "2px solid black" }}>
      <h3>Make: {car.make}</h3>
      <h3>Model: {car.model}</h3>
      <h3>Used/New: {car.newUsed ? "Yes" : "No"}</h3>
      <h3>Color: {car.color}</h3>
      <h3>Year: {car.year}</h3>
      <h3>Vehicle Type: {car.bodyType}</h3>
      <h3>Image: {car.image}</h3>
      <h3>Price: {car.price}</h3>
      <h3>Vin #: {car.vin}</h3>
    </div>
  );
}
export default SingleCar;

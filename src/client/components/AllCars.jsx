import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllCars() {
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState([]);

  const filtered = cars.filter(
    (car) =>
      car.model.includes(search) ||
      car.color.includes(search) ||
      car.year.includes(search) ||
      car.make.includes(search) ||
      car.vehicleType.includes(search)
  );

  useEffect(() => {
    async function getCars() {
      try {
        const { data: foundCars } = await axios.get("/api/singlecar");
        setCars(foundCars);

        console.log(foundCars);
      } catch (error) {
        console.error(error);
      }
    }
    getCars();
  }, []);
  return (
    <div>
      <h2>All Cars</h2>
      <input
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSearch("")}>Submit</button>
      {search.length === 0
        ? cars.map((car) => (
            <div key={car.id}>
              <Link to={`/${car.id}`}>
                <h3>Make: {car.make}</h3>
                <h3>Model: {car.model}</h3>
                <h3>Used/New: {car.new ? "Yes" : "No"}</h3>
                <h3>Color: {car.color}</h3>
                <h3>Year: {car.year}</h3>
                <h3>Vehicle Type: {car.vehicleType}</h3>
                <h3>Image: {car.img}</h3>
                <h3>Price: {car.price}</h3>
                <h3>Vin #: {car.vinNumber}</h3>
              </Link>
            </div>
          ))
        : filtered.map((car) => (
            <div key={car.id}>
              <Link to={`/${car.id}`}>
                <h3>Make: {car.make}</h3>
                <h3>Model: {car.model}</h3>
                <h3>New: {car.new ? "Yes" : "No"}</h3>
                <h3>Color: {car.color}</h3>
                <h3>Year: {car.year}</h3>
                <h3>Vehicle Type: {car.vehicleType}</h3>
                <h3>Image: {car.img}</h3>
                <h3>Price: {car.price}</h3>
                <h3>Vin #: {car.vinNumber}</h3>
              </Link>
            </div>
          ))}
    </div>
  );
}

export default AllCars;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AllCars() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const token = getToken();
        const { data: foundCars } = await axios.get(
          "/api/cars"
          // , {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        setCars(foundCars);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCars();
  }, []);

  console.log("cars", cars);

  // Filtering logic based on search query
  const filtered = cars.filter((car) =>
    car.make.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>All Cars</h2>
      <input
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSearch("")}>Clear</button>
      {search.length === 0
        ? cars.map((car) => (
            <div key={car.id} style={{ border: "1.5px solid black" }}>
              <Link to={`/${car.id}`}>
                <h3>Make: {car.make}</h3>
                <h3>Model: {car.model}</h3>
                <h3>New: {car.newUsed ? "Yes" : "No"}</h3>{" "}
                <h3>Color: {car.color}</h3>
                <h3>Year: {car.year}</h3>
                <h3>Vehicle Type: {car.bodyType}</h3>
                <h3>Image: {car.image}</h3>
                <h3>Price: {car.price}</h3>
                <h3>Vin #: {car.vin}</h3>
              </Link>
            </div>
          ))
        : filtered.map((car) => (
            <div key={car.id}>
              <Link to={`/${car.id}`}>
                <h3>Make: {car.make}</h3>
                <h3>Model: {car.model}</h3>
                <h3>New: {car.newUsed ? "Yes" : "No"}</h3>
                <h3>Color: {car.color}</h3>
                <h3>Year: {car.year}</h3>
                <h3>Body Type: {car.bodyType}</h3>
                <h3>Image: {car.image}</h3>
                <h3>Price: {car.price}</h3>
                <h3>Vin #: {car.vin}</h3>
              </Link>
            </div>
          ))}
    </div>
  );
}

export default AllCars;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

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
        const { data: foundCars } = await axios.get("/api/cars");
        setCars(foundCars);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCars();
  }, []);

  const handleClearSearch = () => {
    setSearch("");
  };

  // Filtering logic based on search query
  const filtered = cars.filter((car) =>
    car.make.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>All Cars</h2>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleClearSearch}
        sx={{ marginBottom: 2 }}
      >
        Clear
      </Button>
      {filtered.length === 0 && <Typography>No cars found.</Typography>}
      {filtered.map((car) => (
        <Card
          key={car.id}
          sx={{
            marginBottom: 2,
            border: "1.5px solid black",
            backgroundColor: "#f5f5f5",
          }}
        >
          <CardContent>
            <Link to={`/${car.id}`} style={{ textDecoration: "none" }}>
              <Typography variant="h6">Make: {car.make}</Typography>
              <Typography variant="h6">Model: {car.model}</Typography>
              <Typography>New: {car.newUsed ? "Yes" : "No"}</Typography>
              <Typography>Color: {car.color}</Typography>
              <Typography>Year: {car.year}</Typography>
              <Typography>Vehicle Type: {car.bodyType}</Typography>
              <Typography>Image: {car.image}</Typography>
              <Typography>Price: ${car.price}</Typography>
              <Typography>Vin #: {car.vin}</Typography>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AllCars;

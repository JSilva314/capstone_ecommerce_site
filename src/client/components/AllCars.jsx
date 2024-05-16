import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Container,
  Box,
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
        const { data: foundCars } = await axios.get("/api/cars", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    <Container>
      <Typography variant="h4" gutterBottom>
        All Cars
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={handleClearSearch}
        sx={{ marginBottom: 2 }}
      >
        Clear
      </Button>
      {filtered.length === 0 && (
        <Typography variant="h6">No cars found.</Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {filtered.map((car) => (
          <Card
            key={car.id}
            sx={{
              width: 300,
              border: "1.5px solid black",
              backgroundColor: "#f5f5f5",
            }}
          >
            {car.image && (
              <CardMedia
                component="img"
                height="140"
                image={car.image}
                alt={`${car.make} ${car.model}`}
              />
            )}
            <CardContent>
              <Link to={`/${car.id}`} style={{ textDecoration: "none" }}>
                <Typography variant="h6" fontWeight="bold">
                  Make: {car.make}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Model: {car.model}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  New: {car.newUsed ? "Yes" : "No"}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  Color: {car.color}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  Year: {car.year}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  Vehicle Type: {car.bodyType}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  Price: ${car.price}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  Vin #: {car.vin}
                </Typography>
              </Link>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                component={Link}
                to={`/${car.id}`}
              >
                View Vehicle
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default AllCars;

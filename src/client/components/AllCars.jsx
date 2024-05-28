import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes
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
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import HeaderTitle from "./HeaderTitle";
import "./AllCars.css";
// import { user } from "../../server/client";


function AllCars({ user }) {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [likedCars, setLikedCars] = useState(() => {
    const savedLikes = localStorage.getItem("likedCars");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const [sparkle, setSparkle] = useState({});
  const [shareTooltip, setShareTooltip] = useState({});

  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const { data: foundCars } = await axios.get("/api/cars", { headers });
        setCars(foundCars);
        console.log(token, headers, foundCars);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCars();
  }, []);

  useEffect(() => {
    localStorage.setItem("likedCars", JSON.stringify(likedCars));
  }, [likedCars]);

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleLike = (id) => {
    setLikedCars((prevLikedCars) => ({
      ...prevLikedCars,
      [id]: !prevLikedCars[id],
    }));
    setSparkle((prevSparkle) => ({
      ...prevSparkle,
      [id]: true,
    }));
    setTimeout(() => {
      setSparkle((prevSparkle) => ({
        ...prevSparkle,
        [id]: false,
      }));
    }, 1500); // Duration of the sparkle effect
  };

  const handleShare = async (car) => {
    const url = `${window.location.origin}/cars/${car.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${car.make} ${car.model}`,
          text: `Check out this car: ${car.make} ${car.model}`,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareTooltip((prev) => ({
          ...prev,
          [car.id]: "Link copied to clipboard!",
        }));
        setTimeout(() => {
          setShareTooltip((prev) => ({
            ...prev,
            [car.id]: "Share",
          }));
        }, 2000);
      } catch (error) {
        console.error("Error copying link:", error);
      }
    }
  };

  const filtered = cars.filter((car) =>
    car.make.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        backgroundImage: 'url("/car2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 4,
          padding: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <HeaderTitle title="Available Cars" color="#4A4A93"/>
        {user.Admin && ( // Conditionally render admin-specific content
          <Box mb={2}>
            <Typography variant="h6" align="center" color="primary">
              Admin: You have special privileges!
            </Typography>
            {/* Add admin-specific features here */}
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Search by make"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, mr: 2 }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleClearSearch}
            sx={{
              backgroundColor: "#15379b",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#0d2357",
              },
              flexShrink: 0,
            }}
          >
            Clear
          </Button>
        </Box>
        {filtered.length === 0 ? (
          <Typography variant="h6" align="center">
            No cars found.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 2,
            }}
          >
            {filtered.map((car) => (
              <Card
                key={car.id}
                className={sparkle[car.id] ? "sparkle" : ""}
                sx={{
                  border: "none",
                  borderRadius: 1.5,
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                {car.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={car.image}
                    alt={`${car.make} ${car.model}`}
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ padding: 2.5 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      to={`/cars/${car.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {car.make} {car.model}
                      </Typography>
                    </Link>
                    <Box display="flex" flexDirection="column">
                      <IconButton onClick={() => handleLike(car.id)}>
                        {likedCars[car.id] ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                      <Tooltip title={shareTooltip[car.id] || "Share"}>
                        <IconButton onClick={() => handleShare(car)}>
                          <ShareIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    New: {car.newUsed ? "Yes" : "No"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Color: {car.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Year: {car.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vehicle Type: {car.bodyType}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    Price: ${car.price.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    Vin #: {car.vin}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Miles: {car.miles}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      backgroundColor: "#15379b",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#0d2357",
                      },
                      width: "100%",
                    }}
                    component={Link}
                    to={`/cars/${car.id}`}
                  >
                    View Vehicle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default AllCars;

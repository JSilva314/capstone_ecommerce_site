import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
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
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CompareIcon from "@mui/icons-material/Compare";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderTitle from "./HeaderTitle";
import "./AllCars.css";
// import { user } from "../../server/client";
import { Helmet } from "react-helmet";

function AllCars({ user }) {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [refresher, setRefresher] = useState(false);
  const [likedCars, setLikedCars] = useState(() => {
    const savedLikes = localStorage.getItem("likedCars");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  const [sparkle, setSparkle] = useState({});
  const [shareTooltip, setShareTooltip] = useState({});
  const [vinTooltip, setVinTooltip] = useState({});
  const [compareCars, setCompareCars] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCars, setSelectedCars] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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
      } catch (error) {
        console.error(error);
      }
    }
    fetchCars();
  }, [refresher]);

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
    }, 1500);
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

  const handleVinCopy = async (vin, id) => {
    try {
      await navigator.clipboard.writeText(vin);
      setVinTooltip((prev) => ({
        ...prev,
        [id]: "VIN copied to clipboard!",
      }));
      setTimeout(() => {
        setVinTooltip((prev) => ({
          ...prev,
          [id]: "Copy VIN",
        }));
      }, 2000);
    } catch (error) {
      console.error("Error copying VIN:", error);
    }
  };

  const handleCompare = (car) => {
    setIsDrawerOpen(true);
    setCompareCars((prevCompareCars) => {
      if (prevCompareCars.find((c) => c.id === car.id)) {
        return prevCompareCars;
      }
      if (prevCompareCars.length >= 5) {
        toast.info("You can only compare up to 5 cars.");
        return prevCompareCars;
      }
      return [...prevCompareCars, car].sort((a, b) => a.price - b.price);
    });
  };

  const handleRemoveCompare = (id) => {
    setCompareCars((prevCompareCars) =>
      prevCompareCars.filter((car) => car.id !== id)
    );
  };

  const handleSelectCar = (car) => {
    setSelectedCars((prevSelectedCars) => {
      if (prevSelectedCars.find((c) => c.id === car.id)) {
        return prevSelectedCars.filter((c) => c.id !== car.id);
      }
      if (prevSelectedCars.length >= 2) {
        toast.info("You can only compare 2 cars at a time.");
        return prevSelectedCars;
      }
      return [...prevSelectedCars, car];
    });
  };

  const handleAddToCart = (car) => {
    if (!user) {
      navigate("/register");
      return;
    }
    setCart((prevCart) => [...prevCart, car]);
    toast.success(`${car.make} ${car.model} added to cart!`);
  };

  const filtered = cars.filter((car) =>
    car.make.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteCar = async (carId) => {
    try {
      const response = await axios.delete(`/api/cars/${carId}`);
      console.log(response.data);
      setRefresher((prev) => !prev);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  const compareAttributes = (car1, car2, attribute) => {
    if (attribute === "price" || attribute === "miles") {
      if (car1[attribute] < car2[attribute]) {
        return ["green", "red"];
      } else {
        return ["red", "green"];
      }
    } else if (attribute === "year") {
      if (car1[attribute] > car2[attribute]) {
        return ["green", "red"];
      } else {
        return ["red", "green"];
      }
    }
    return ["black", "black"];
  };

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
      <Helmet>
        <title>Available Cars - CarMin</title>
      </Helmet>
      <ToastContainer />
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 4,
          padding: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <HeaderTitle title="Available Cars" color="#4A4A93" />

        {user.Admin && ( // Conditionally render admin-specific content
          <Box mb={2}>
            <Typography variant="h6" align="center" color="primary">
              Admin: You have special privileges!
            </Typography>
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
                  margin: 2,
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
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: "700",
                          color: "#333",
                          gutterBottom: true,
                        }}
                      >
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
                      <Tooltip title="Compare and contrast 2 cars, add up to 5 cars to compare">
                        <IconButton onClick={() => handleCompare(car)}>
                          <CompareIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: car.newUsed ? "#0000FF" : "#E23A26",
                      fontWeight: "bold",
                    }}
                  >
                    New: {car.newUsed ? "Yes" : "No"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#000000", fontWeight: "bold" }}
                  >
                    Color: {car.color}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#000000", fontWeight: "bold" }}
                  >
                    Year: {car.year}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#000000", fontWeight: "bold" }}
                  >
                    Vehicle Type: {car.bodyType}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    Price: ${car.price.toLocaleString()}
                  </Typography>
                  <Tooltip title={vinTooltip[car.id] || "Copy VIN"}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={() => handleVinCopy(car.vin, car.id)}
                    >
                      Vin #: {car.vin}
                    </Typography>
                  </Tooltip>
                  <Typography
                    variant="body2"
                    sx={{ color: "#4A4A4A", fontWeight: "bold" }}
                  >
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
                  <Button
                    onClick={() => {
                      handleDeleteCar(car.id);
                    }}
                  >
                    Delete Vehicle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 300, padding: 2 }}>
          <Box
            mt={0.5}
            mb={2}
            sx={{
              textAlign: "center",
              border: "none",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "#4A4A93",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
              fontFamily: "'Raleway', sans-serif",
              fontWeight: "600",
              fontSize: "1.5rem",
            }}
          >
            Compare Cars
          </Box>
          <List>
            {compareCars.map((car) => (
              <ListItem
                key={car.id}
                button
                onClick={() => handleSelectCar(car)}
                sx={{
                  backgroundColor: selectedCars.find((c) => c.id === car.id)
                    ? "#f0f0f0"
                    : "inherit",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <ListItemText
                  primary={`${car.make} ${car.model}`}
                  secondary={`Price: $${car.price.toLocaleString()}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveCompare(car.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {compareCars.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No cars selected for comparison.
            </Typography>
          )}
          {selectedCars.length === 2 && (
            <Box mt={2} p={2} border="1px solid #ccc" borderRadius={4}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  backgroundColor: "#4A4A93",
                  color: "#fff",
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: "600",
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                Comparing:
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <CardMedia
                  component="img"
                  height="50"
                  image={selectedCars[0].image}
                  alt={`${selectedCars[0].make} ${selectedCars[0].model}`}
                  sx={{ objectFit: "cover" }}
                />
                <CardMedia
                  component="img"
                  height="50"
                  image={selectedCars[1].image}
                  alt={`${selectedCars[1].make} ${selectedCars[1].model}`}
                  sx={{ objectFit: "cover" }}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "price"
                    )[0],
                    fontWeight: "bold",
                  }}
                >
                  {selectedCars[0].make} {selectedCars[0].model} - $
                  {selectedCars[0].price.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "price"
                    )[1],
                    fontWeight: "bold",
                  }}
                >
                  {selectedCars[1].make} {selectedCars[1].model} - $
                  {selectedCars[1].price.toLocaleString()}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "color"
                    )[0],
                    fontWeight: "bold",
                  }}
                >
                  Color: {selectedCars[0].color}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "color"
                    )[1],
                    fontWeight: "bold",
                  }}
                >
                  Color: {selectedCars[1].color}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "year"
                    )[0],
                    fontWeight: "bold",
                  }}
                >
                  Year: {selectedCars[0].year}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "year"
                    )[1],
                    fontWeight: "bold",
                  }}
                >
                  Year: {selectedCars[1].year}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "bodyType"
                    )[0],
                    fontWeight: "bold",
                  }}
                >
                  Vehicle Type: {selectedCars[0].bodyType}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "bodyType"
                    )[1],
                    fontWeight: "bold",
                  }}
                >
                  Vehicle Type: {selectedCars[1].bodyType}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "miles"
                    )[0],
                    fontWeight: "bold",
                  }}
                >
                  Miles: {selectedCars[0].miles}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: compareAttributes(
                      selectedCars[0],
                      selectedCars[1],
                      "miles"
                    )[1],
                    fontWeight: "bold",
                  }}
                >
                  Miles: {selectedCars[1].miles}
                </Typography>
              </Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(selectedCars[0])}
                  sx={{
                    backgroundColor: "#15379b",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0d2357",
                    },
                    width: "100%",
                    mb: 1,
                  }}
                >
                  Add {selectedCars[0].make} {selectedCars[0].model} to Cart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(selectedCars[1])}
                  sx={{
                    backgroundColor: "#15379b",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#0d2357",
                    },
                    width: "100%",
                  }}
                >
                  Add {selectedCars[1].make} {selectedCars[1].model} to Cart
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}

export default AllCars;

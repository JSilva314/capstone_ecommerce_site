import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";
import { keyframes } from "@mui/system";

const videos = [
  "/landingvid1.mp4",
  "/landingvid2.mp4",
  "/landingvid3.mp4",
  "/landingvid4.mp4",
  "/landingvid5.mp4",
];

// Define keyframes for sliding animation
const slideIn = keyframes`
  0% {
    transform: translateX(-33%);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const LandingPage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [randomCars, setRandomCars] = useState([]);
  const [timer, setTimer] = useState(3600); // 1 hour in seconds
  const navigate = useNavigate();
  const storedTimestamp = localStorage.getItem("timestamp");
  const storedCars = JSON.parse(localStorage.getItem("discountedCars"));

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("/api/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const handleEnded = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentVideoIndex]);

  const getRandomCars = () => {
    let shuffledCars = cars.sort(() => 0.5 - Math.random());
    return shuffledCars.slice(0, 3);
  };

  useEffect(() => {
    if (storedCars && storedTimestamp) {
      const currentTime = Date.now();
      const timeElapsed = Math.floor((currentTime - storedTimestamp) / 1000);
      if (timeElapsed < 3600) {
        setRandomCars(storedCars);
        setTimer(3600 - timeElapsed);
      } else {
        const newRandomCars = getRandomCars();
        setRandomCars(newRandomCars);
        localStorage.setItem("discountedCars", JSON.stringify(newRandomCars));
        localStorage.setItem("timestamp", Date.now());
        setTimer(3600);
      }
    } else if (cars.length) {
      const newRandomCars = getRandomCars();
      setRandomCars(newRandomCars);
      localStorage.setItem("discountedCars", JSON.stringify(newRandomCars));
      localStorage.setItem("timestamp", Date.now());
      setTimer(3600);
    }
  }, [cars]);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handlePurchase = (car) => {
    axios
      .post("/api/cart", { carId: car.id })
      .then((response) => {
        navigate("/register");
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <Box
      className="poppins-semibold"
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold",
      }}
    >
      <video
        ref={videoRef}
        key={currentVideoIndex}
        src={videos[currentVideoIndex]}
        autoPlay
        muted
        loop={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Container maxWidth="md" sx={{ zIndex: 1, mt: 12, mb: 12 }}>
        <Box
          sx={{
            textAlign: "center",
            borderRadius: 2,
            padding: 3,
            backgroundColor: "rgba(50, 50, 112, 0.7)",
            color: "#fff",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <HeaderTitle title="Welcome to Our Car Dealership" />
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{
              color: "#71bfdc",
              animation: `${slideIn} 7.5s ease-out`,
              animationFillMode: "forwards", // Ensure it stays in the final position
            }}
          >
            "Find your dream car with us."
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            mt: 3,
            backdropFilter: "blur(10px)",
          }}
        >
          <Swiper
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper"
          >
            {randomCars.map((car, index) => {
              const discountedPrice = (car.price * 0.9).toFixed(2); // 10% discount
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: 3,
                      borderRadius: 2,
                      backdropFilter: "blur(10px)",
                      mt: 8,
                      mb: 8,
                      maxHeight: "calc(100vh - 150px)", // Adjust for nav bars
                      overflowY: "hidden", // Prevent scroll bars
                    }}
                  >
                    <img
                      src={car.image}
                      alt={car.title}
                      style={{
                        width: "100%",
                        borderRadius: 8,
                        maxHeight: "300px",
                        objectFit: "cover",
                        padding: "10px",
                      }}
                    />
                    <Typography variant="h4" component="h2" gutterBottom>
                      {car.title}
                    </Typography>
                    <Typography variant="body1" component="p" gutterBottom>
                      {car.description}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        padding: 2,
                        borderRadius: 2,
                        mt: 2,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="p"
                        gutterBottom
                        sx={{ color: "red" }}
                      >
                        Original Price: ${car.price}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        gutterBottom
                        sx={{ color: "green" }}
                      >
                        Discounted Price: ${discountedPrice}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        gutterBottom
                        sx={{ color: "lightcoral" }}
                      >
                        Special Discount Timer: {formatTime(timer)}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => handlePurchase(car)}
                      >
                        Purchase Now
                      </Button>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;

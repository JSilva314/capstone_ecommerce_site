import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

// Define keyframes for border color transition
const borderColorChange = keyframes`
  0% {
    border-color: green;
  }
  50% {
    border-color: #323270;
  }
  100% {
    border-color: green;
  }
`;

// Define keyframes for button pulse animation
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const LandingPage = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [useFirstVideo, setUseFirstVideo] = useState(true);
  const [cars, setCars] = useState([]);
  const [randomCars, setRandomCars] = useState([]);
  const [timer, setTimer] = useState(3600); // 1 hour in seconds
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const storedTimestamp = localStorage.getItem("timestamp");
  const storedCars = JSON.parse(localStorage.getItem("discountedCars"));

  const fetchCars = async () => {
    try {
      const response = await axios.get("/api/cars");
      const filteredCars = response.data.filter((car) => car.year >= 2020);

      setCars(filteredCars);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch cars. Please try again later.");
      setLoading(false);
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const handleEnded = () => {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      const nextVideoRef = useFirstVideo ? videoRef2 : videoRef1;

      nextVideoRef.current.src = videos[nextIndex];
      nextVideoRef.current.load();
      nextVideoRef.current.onloadeddata = () => {
        setUseFirstVideo(!useFirstVideo);
        setCurrentVideoIndex(nextIndex);
      };
    };

    const videoElement = useFirstVideo ? videoRef1.current : videoRef2.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentVideoIndex, useFirstVideo]);

  useEffect(() => {
    const currentVideoElement = useFirstVideo
      ? videoRef1.current
      : videoRef2.current;
    if (currentVideoElement) {
      currentVideoElement.src = videos[currentVideoIndex];
      currentVideoElement.load();
      currentVideoElement.play();
    }
  }, [currentVideoIndex, useFirstVideo]);

  const getRandomCars = () => {
    let shuffledCars = cars.sort(() => 0.5 - Math.random());
    return shuffledCars.slice(0, 3);
  };

  useEffect(() => {
    const currentTime = Date.now();
    const isValidStoredData = () => {
      if (storedCars && storedTimestamp) {
        const timeElapsed = Math.floor((currentTime - storedTimestamp) / 1000);
        return timeElapsed < 3600;
      }
      return false;
    };

    if (isValidStoredData()) {
      const timeElapsed = Math.floor((currentTime - storedTimestamp) / 1000);
      setRandomCars(storedCars);
      setTimer(3600 - timeElapsed);
    } else if (cars.length) {
      const newRandomCars = getRandomCars();
      setRandomCars(newRandomCars);
      localStorage.setItem("discountedCars", JSON.stringify(newRandomCars));
      localStorage.setItem("timestamp", currentTime);
      setTimer(3600);
    }
  }, [cars]);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(countdownTimer);
          localStorage.removeItem("discountedCars");
          localStorage.removeItem("timestamp");
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handlePurchase = async (car) => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/register");
    } else {
      const discountedPrice = (car.price * 0.9).toFixed(2); // 10% discount
      navigate("/cart", { state: { car, discountedPrice } });

      // Update the cars list after purchase
      await fetchCars();
      const newRandomCars = getRandomCars();
      setRandomCars(newRandomCars);
      localStorage.setItem("discountedCars", JSON.stringify(newRandomCars));
      localStorage.setItem("timestamp", Date.now());
    }
  };

  const wrapLetters = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} style={{ color: "white" }}>
        {char}
      </span>
    ));
  };

  return (
    <Box
      className="raleway-font"
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
        fontFamily: "Raleway, sans-serif",
        fontWeight: "SemiBold 600",
      }}
    >
      <Helmet>
        <title>CarMin | Cheapest Cars Available</title>
      </Helmet>
      <video
        ref={videoRef1}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: useFirstVideo ? -1 : -2,
          opacity: useFirstVideo ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
        muted
        autoPlay
        loop={false}
      />
      <video
        ref={videoRef2}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: useFirstVideo ? -2 : -1,
          opacity: useFirstVideo ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
        muted
        autoPlay
        loop={false}
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
            marginTop: "140px", // Adjust margin to avoid the navbar
          }}
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{
              display: "inline-block",
              animation: `${slideIn} 7.5s ease-out`,
              animationFillMode: "forwards", // Ensure it stays in the final position
              fontFamily: "Playfair Display, serif",
              fontStyle: "Bold 700",
              fontWeight: 400,
              color: "white",
            }}
          >
            {wrapLetters(
              "The way your car buying experience should be, discounted prices all day, CarMin Certified quality. "
            )}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{
              color: "#71bfdc",
              animation: `${slideIn} 7.5s ease-out`,
              animationFillMode: "forwards", // Ensure it stays in the final position
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontWeight: 400,
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
            height: "auto",
            minHeight: "300px",
          }}
        >
          {loading ? (
            <Typography variant="h6" color="white">
              Loading cars...
            </Typography>
          ) : error ? (
            <Typography variant="h6" color="red">
              {error}
            </Typography>
          ) : (
            <Swiper
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="mySwiper"
              style={{ paddingBottom: "50px" }}
            >
              {randomCars.length > 0 ? (
                randomCars.map((car, index) => {
                  const discountedPrice = (car.price * 0.9).toFixed(2); // 10% discount
                  return (
                    <SwiperSlide key={index}>
                      <Card
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
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          border: "2px solid transparent",
                          transition: "border-color 2s",
                          "&:hover": {
                            borderColor: "#71bfdc",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={car.image}
                          alt={car.title}
                          sx={{
                            width: "100%",
                            borderRadius: 2,
                            maxHeight: "300px",
                            objectFit: "cover",
                            padding: "10px",
                            backgroundColor: "rgba(113, 191, 220, 0.3)",
                            border: "5px solid transparent",
                            borderRadius: "8px",
                            animation: `${borderColorChange} 4s infinite`,
                          }}
                        />
                        <CardContent>
                          <Typography variant="h4" component="h2" gutterBottom>
                            {car.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            component="p"
                            gutterBottom
                          >
                            {car.description}
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
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
                              sx={{ color: "red", fontWeight: "bold" }}
                            >
                              Original Price: ${car.price}
                            </Typography>
                            <Typography
                              variant="h6"
                              component="p"
                              gutterBottom
                              sx={{ color: "green", fontWeight: "bold" }}
                            >
                              Discounted Price: ${discountedPrice}
                            </Typography>
                            <Typography
                              variant="h6"
                              component="p"
                              gutterBottom
                              sx={{
                                fontWeight: "bold",
                                color: "rgba(255, 165, 0, 1)", // Bold Orange
                              }}
                            >
                              Special Discount Timer: {formatTime(timer)}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="p"
                              gutterBottom
                              sx={{ color: "black", marginTop: 1 }}
                            >
                              *Purchase now before the clock countdown ends to
                              lock in price!
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                mt: 2,
                                animation: `${pulse} 2s infinite`,
                              }}
                              onClick={() => handlePurchase(car)}
                            >
                              Add to Cart
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </SwiperSlide>
                  );
                })
              ) : (
                <Typography variant="h6" color="white">
                  No cars available at the moment.
                </Typography>
              )}
            </Swiper>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;

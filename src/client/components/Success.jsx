import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";
import Confetti from "react-confetti";

// Define the keyframes for the pop-out animation
const popOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

// Define the keyframes for the drop-down animation
const dropDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Success = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiPieces, setConfettiPieces] = useState(200);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiPieces(50); // Reduce the number of confetti pieces
      setTimeout(() => setShowConfetti(false), 5000); // Gradually end the confetti animation
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={confettiPieces}
          recycle={confettiPieces > 50}
          wind={0.01}
          gravity={0.03}
        />
      )}
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/istockvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Container maxWidth="sm">
        <Card
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Increased transparency
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            borderRadius: "15px",
            padding: 4,
            textAlign: "center",
            animation: `${dropDown} 1s ease-out`,
          }}
        >
          <CardContent>
            <CheckCircleOutlineIcon
              sx={{
                fontSize: 80,
                color: "green",
                animation: `${popOut} 4s ease-in-out`,
              }}
            />
            <Typography variant="h4" component="h2" gutterBottom>
              Purchase Successful!
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ fontSize: "3rem", fontWeight: "bold" }}
            >
              Congratulations!
            </Typography>
            <Typography
              variant="body1"
              component="p"
              gutterBottom
              sx={{ fontStyle: "italic" }}
            >
              Thank you for your purchase. Your order has been confirmed and
              shipping details have been sent to your e-mail on file. This is an
              important chapter and we are glad you chose us as your purchasing
              platform.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              component={Link}
              to="/orders"
            >
              Go to My Orders
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Success;

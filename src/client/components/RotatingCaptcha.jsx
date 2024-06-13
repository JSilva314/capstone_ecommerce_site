import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const borderAnimation = keyframes`
  0% {
    border-color: purple;
  }
  50% {
    border-color: lightgreen;
  }
  100% {
    border-color: purple;
  }
`;

function RotatingCaptcha({ onVerified }) {
  const [rotation, setRotation] = useState(0);

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90) % 360);
  };

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleVerify = () => {
    if (rotation === 0) {
      onVerified();
    } else {
      alert("Please rotate the image to the correct orientation.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="h5"
        mb={2}
        textAlign="center"
        sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
      >
        Verify that you're Human!
      </Typography>
      <Box
        component="img"
        src="/car.png"
        alt="CAPTCHA"
        sx={{
          transform: `rotate(${rotation}deg)`,
          width: "200px",
          height: "200px",
          border: "5px solid",
          animation: `${borderAnimation} 3s infinite`,
          marginBottom: "8px",
        }}
      />
      <Typography
        variant="body1"
        mb={2}
        textAlign="center"
        sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
      >
        Please rotate the car horizontally so that it's facing right.
      </Typography>
      <Box display="flex" gap={2} justifyContent="center">
        <Button
          variant="contained"
          onClick={handleRotateLeft}
          sx={{
            backgroundColor: "#241A5C",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#1E164D",
            },
            fontFamily: "Raleway, sans-serif",
          }}
        >
          Rotate Left
        </Button>
        <Button
          variant="contained"
          onClick={handleRotateRight}
          sx={{
            backgroundColor: "#241A5C",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#1E164D",
            },
            fontFamily: "Raleway, sans-serif",
          }}
        >
          Rotate Right
        </Button>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleVerify}
        sx={{
          marginTop: "20px",
          alignSelf: "center",
          backgroundColor: "#241A5C",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#1E164D",
          },
          fontFamily: "Raleway, sans-serif",
        }}
      >
        Verify
      </Button>
    </Box>
  );
}

export default RotatingCaptcha;

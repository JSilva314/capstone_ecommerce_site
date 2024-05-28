import React from "react";
import { Box, Typography } from "@mui/material";

const HeaderTitle = ({ title, color = "inherit" }) => {
  return (
    <Box
      mt={0.5}
      mb={2}
      sx={{
        textAlign: "center",
        border: "none",
        borderRadius: "12px",
        padding: "20px",
        background: color, // Use the color prop for background
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)", // Box shadow for depth
        color: "#fff", // White text color for contrast
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)", // Slight scaling on hover
        },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        sx={{ fontFamily: "'Roboto', sans-serif" }} // Modern font
      >
        {title}
      </Typography>
    </Box>
  );
};

export default HeaderTitle;

import React from "react";
import { Box, Typography } from "@mui/material";

const HeaderTitle = ({ title }) => {
  return (
    <Box
      mt={0.5}
      mb={2}
      sx={{
        textAlign: "center",
        border: "none",
        borderRadius: "12px",
        padding: "20px",
        background: "linear-gradient(135deg, #6e8efb, #a777e3)", // gradient background
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)", // box shadow for depth
        color: "#fff", // white text color for contrast
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)", // slight scaling on hover
        },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
        sx={{ fontFamily: "'Roboto', sans-serif" }} // modern font
      >
        {title}
      </Typography>
    </Box>
  );
};

export default HeaderTitle;

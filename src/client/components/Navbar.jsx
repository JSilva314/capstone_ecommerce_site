import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";

function Navbar({ setToken, isLoggedIn, fetchCart, isAdmin }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setToken(null);
    window.localStorage.removeItem("TOKEN");
    navigate("/");
  };

  const openFeedbackPopup = () => {
    window.open(
      "https://b0g6gajkw70.typeform.com/to/T0U8FOc7",
      "feedbackWindow",
      "width=600,height=800,left=100,top=100"
    );
  };

  const handleNavigateToCart = () => {
    if (fetchCart) fetchCart();
    navigate("/cart");
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#323270" }}>
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <img
              src="/brand.jpg"
              alt="Company Logo"
              style={{ height: "100px", marginLeft: "-40px" }} // Adjust the height and margin HERE as needed
            />
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", letterSpacing: 2 }}
            ></Typography>
          </Box>
          <Button color="inherit" component={Link} to="/">
            <HomeIcon sx={{ mr: 1 }} />
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cars">
            <DirectionsCarIcon sx={{ mr: 1 }} />
            View Cars
          </Button>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleNavigateToCart}>
                <ShoppingCartIcon sx={{ mr: 1 }} />
                My Cart
              </Button>
              <Button color="inherit" component={Link} to="/orders">
                <HistoryIcon sx={{ mr: 1 }} />
                Orders
              </Button>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ fontSize: 30 }} // Adjust font size here
              >
                <AccountCircle sx={{ fontSize: 45 }} />{" "}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ height: "100px" }} />{" "}
      {/* This empty Toolbar acts as a spacer with specific height!!! */}
      <Button
        variant="contained"
        onClick={openFeedbackPopup}
        sx={{
          position: "fixed",
          right: "10px",
          top: "88%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "right center",
          zIndex: 1000,
          backgroundColor: "#241A5C", // Set custom background color here
          color: "#fff", // Set custom text color here
          "&:hover": {
            backgroundColor: "#e64a19",
          },
        }}
      >
        Feedback
      </Button>
    </>
  );
}

export default Navbar;

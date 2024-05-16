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
import DirectionsCar from "@mui/icons-material/DirectionsCar"; // Import car icon for the logo

function Navbar({ setToken, isLoggedIn }) {
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <DirectionsCar sx={{ mr: 1 }} /> {/* Add car icon */}
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", letterSpacing: 2 }}
          >
            CarMin
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/">
          <HomeIcon sx={{ mr: 1 }} />
          Home
        </Button>
        <Button color="inherit" component={Link} to="/cars">
          <DirectionsCarIcon sx={{ mr: 1 }} />
          All Cars
        </Button>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon sx={{ mr: 1 }} />
              My Cart
            </Button>
            <Button color="inherit" component={Link} to="/orders">
              Orders
            </Button>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
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
  );
}

export default Navbar;

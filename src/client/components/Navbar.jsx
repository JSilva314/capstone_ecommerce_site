import React, { useState, useEffect } from "react";
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

function Navbar({ setToken, isLoggedIn, fetchCart, user }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  useEffect(() => {
    // Function to initialize Google Translate
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,zh-CN",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Dynamically load Google Translate script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.onload = googleTranslateElementInit;
    document.head.appendChild(script);

    // Clean up function to remove the script
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageMenu = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    const googleTranslateElement = document.querySelector(".goog-te-combo");
    if (googleTranslateElement) {
      googleTranslateElement.value = lang;
      googleTranslateElement.dispatchEvent(new Event("change"));
    }
    handleLanguageClose();
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
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#323270", fontFamily: "Raleway, sans-serif" }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <img
              src="/brand.jpg"
              alt="Company Logo"
              style={{ height: "100px", marginLeft: "-40px" }}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", letterSpacing: 2 }}
            ></Typography>
          </Box>
          <Button
            color="inherit"
            onClick={handleLanguageMenu}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <img
              src="/images/english-flag.png"
              alt="English"
              style={{ marginRight: "8px", height: "20px", width: "20px" }}
            />
            EN
          </Button>
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              <img
                src="/images/english-flag.png"
                alt="English"
                style={{ marginRight: "8px", height: "20px", width: "20px" }}
              />
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("es")}>
              <img
                src="/images/spanish-flag.png"
                alt="Español"
                style={{ marginRight: "8px", height: "20px", width: "20px" }}
              />
              Español
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("zh-CN")}>
              <img
                src="/images/chinese-flag.png"
                alt="中文"
                style={{ marginRight: "8px", height: "20px", width: "20px" }}
              />
              中文
            </MenuItem>
          </Menu>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <HomeIcon sx={{ mr: 1 }} />
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/cars"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <DirectionsCarIcon sx={{ mr: 1 }} />
            View Cars
          </Button>
          {isLoggedIn ? (
            <>
              {user.Admin ? (
                <Button
                  color="inherit"
                  component={Link}
                  to="/users"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  Admin
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={handleNavigateToCart}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  >
                    <ShoppingCartIcon sx={{ mr: 1 }} />
                    My Cart
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/orders"
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  >
                    <HistoryIcon sx={{ mr: 1 }} />
                    Orders
                  </Button>
                </>
              )}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{
                  fontSize: 30,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <AccountCircle sx={{ fontSize: 45 }} />
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
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ height: "100px" }} />
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
          backgroundColor: "#241A5C",
          color: "#fff",
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

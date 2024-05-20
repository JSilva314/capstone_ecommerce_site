import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material"; 
import DirectionsCar from "@mui/icons-material/DirectionsCar"; 

const sections = {
  Shop: [
    "Browse by category",
    "View all inventory",
    "Find a store",
    "Sell/Trade",
    "Get an online offer",
  ],
  "How it works": [
    "Finance",
    "Get pre-qualified",
    "How it works",
    "CarMin Auto Finance",
  ],
  About: [
    "About CarMin",
    "Contact us",
    "Social responsibility",
    "Media center",
    "Supplier inclusion",
    "Investor relations",
    "Careers",
    "Search jobs",
  ],
  More: [
    "Service & repairs",
    "FAQ & support",
    "Why CarMin",
    "Buying online",
    "Car research & advice",
    "Warranties and MaxCare®",
  ],
};

const BottomNavBar = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 4, mt: 4 }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <IconButton href="/" color="inherit">
            <DirectionsCar sx={{ fontSize: 40 }} /> {/* Logo icon */}
          </IconButton>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            color="inherit"
          >
            <Facebook sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            href="https://www.twitter.com"
            target="_blank"
            color="inherit"
          >
            <Twitter sx={{ fontSize: 30 }} />
          </IconButton>
          <IconButton
            href="https://www.instagram.com"
            target="_blank"
            color="inherit"
          >
            <Instagram sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        <Grid container spacing={3}>
          {Object.keys(sections).map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section}>
              <Typography variant="h6" gutterBottom>
                {section}
              </Typography>
              {sections[section].map((item) => (
                <Link
                  href="#"
                  key={item}
                  variant="body2"
                  display="block"
                  gutterBottom
                >
                  {item}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
        <Box mt={4}>
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            By using CarMin.com, you consent to the monitoring and storing of
            your interactions with the website, including with a CarMin vendor,
            for use in improving and personalizing our services. See our{" "}
            <Link href="#">Privacy Policy</Link> for details.
          </Typography>
          <Box mt={2}>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              <Link href="#">Privacy Policy</Link> |{" "}
              <Link href="#">Do Not Sell or Share My Information</Link> |{" "}
              <Link href="#">Financial Privacy Policy</Link> |{" "}
              <Link href="#">Interest-Based Ads</Link> |{" "}
              <Link href="#">Terms of Use</Link> |{" "}
              <Link href="#">Responsible Disclosure</Link> |{" "}
              <Link href="#">CarMin Recall Policy</Link> |{" "}
              <Link href="#">CA Supply Chain Transparency</Link> |{" "}
              <Link href="#">Accessibility</Link> |{" "}
              <Link href="#">Feedback</Link>
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="textSecondary"
              mt={2}
            >
              Copyright © 2024 CarMin Capitise Management, LLC
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BottomNavBar;

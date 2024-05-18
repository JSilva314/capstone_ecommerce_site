import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import HeaderTitle from "./HeaderTitle";

const STRIPE_PUBLIC_KEY =
  "pk_test_51NcJTlH1n5IBH956mDK5AfZHroKsTnuSExgrJHAeo87CkcmCVpP0fqo2iBpve50cOFspCvBLEPhaMagYNUhvtg5400KX1meK4a";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

function CartAndCheckout({ user }) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };

  const logout = () => {
    localStorage.removeItem("TOKEN");
  };

  useEffect(() => {
    async function fetchCart() {
      try {
        const token = getToken();
        const { data: foundCart } = await axios.get(`/api/cart/${user?.id}`);
        setCart(foundCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
    if (user) {
      fetchCart();
    }
  }, [user]);

  const handleRemoveCartItem = async (cartId) => {
    try {
      await axios.delete(`/api/cart/${cartId}`);
      toast.success("Item removed from cart successfully");
      setCart((prevCart) => prevCart.filter((item) => item.id !== cartId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Error removing item from cart. Please try again.");
    }
  };

  const handlePurchaseCar = async (name, price, carId, cartId, carImage) => {
    try {
      const token = getToken(); // Get JWT token from localStorage
      const response = await axios.post(
        `/api/stripe/create-checkout-session`,
        {
          productName: name,
          productPrice: price,
          carId: carId,
          userId: user?.id,
          cartId: cartId,
          productImage: carImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const stripe = await stripePromise;

      toast.success("Car purchased successfully!");

      const session = await response.data; // Use response.data for axios

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error purchasing car:", error);
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error message:", error.response.data);
      }
      toast.error("Error purchasing car. Please try again.");
    }
  };

  return (
    <Container>
      <HeaderTitle title="My Cart" />
      <Grid container spacing={3}>
        {cart.map((singleCart) => (
          <Grid item xs={12} sm={6} md={4} key={singleCart.car.id}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              {singleCart.car.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={singleCart.car.image}
                  alt={`${singleCart.car.make} ${singleCart.car.model}`}
                />
              )}
              <CardContent>
                <Link
                  to={`/${singleCart.car.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="h6">{singleCart.car.make}</Typography>
                  <Typography variant="h6">{singleCart.car.model}</Typography>
                  <Typography>
                    New: {singleCart.car.newUsed ? "Yes" : "No"}
                  </Typography>
                  <Typography>Color: {singleCart.car.color}</Typography>
                  <Typography>Year: {singleCart.car.year}</Typography>
                  <Typography>
                    Vehicle Type: {singleCart.car.bodyType}
                  </Typography>
                  <Typography>Price: ${singleCart.car.price}</Typography>
                  <Typography>Vin #: {singleCart.car.vin}</Typography>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveCartItem(singleCart.id)}
                  sx={{ mt: 2 }}
                >
                  Remove from Cart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handlePurchaseCar(
                      singleCart.car.model,
                      singleCart.car.price,
                      singleCart.car.id,
                      singleCart.id,
                      singleCart.car.image
                    )
                  }
                  sx={{ mt: 2 }}
                >
                  Purchase Car
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CartAndCheckout;

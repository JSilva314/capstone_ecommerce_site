import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };

  const fetchCart = useCallback(async () => {
    try {
      const token = getToken();
      const { data: foundCart } = await axios.get(`/api/cart/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(foundCart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);

  useEffect(() => {
    if (location.state && location.state.car) {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: Date.now(), // Temporary ID
          car: location.state.car,
          discountedPrice: location.state.discountedPrice,
        },
      ]);
    }
  }, [location.state]);

  const handleRemoveCartItem = async (cartId) => {
    try {
      const token = getToken();
      await axios.delete(`/api/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          metadata: {
            userId: user?.id,
            carId: carId,
            cartId: cartId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const stripe = await stripePromise;

      toast.success("Redirecting to Stripe for payment...");

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
      <HeaderTitle title="My Cart" color="#4A4A93" />
      <Grid container spacing={3}>
        {cart.map((singleCart) => (
          <Grid item xs={12} sm={6} md={4} key={singleCart.id}>
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
                  <Typography>
                    Price: $
                    {singleCart.discountedPrice
                      ? singleCart.discountedPrice
                      : singleCart.car.price}
                  </Typography>
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
                      singleCart.discountedPrice
                        ? singleCart.discountedPrice
                        : singleCart.car.price,
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
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

  const handlePurchaseCar = async (name, price, carId, cartId) => {
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
    <div>
      <h2>My Cart</h2>
      {cart.map((singleCart) => (
        <div key={singleCart.car.id} style={{ border: "1.5px solid black" }}>
          <Link to={`/${singleCart.car.id}`}>
            <h3>Make: {singleCart.car.make}</h3>
            <h3>Model: {singleCart.car.model}</h3>
            <h3>New: {singleCart.car.newUsed ? "Yes" : "No"}</h3>{" "}
            <h3>Color: {singleCart.car.color}</h3>
            <h3>Year: {singleCart.car.year}</h3>
            <h3>Vehicle Type: {singleCart.car.bodyType}</h3>
            <h3>Image: {singleCart.car.image}</h3>
            <h3>Price: ${singleCart.car.price}</h3>
            <h3>Vin #: {singleCart.car.vin}</h3>
          </Link>
          <Button onClick={() => handleRemoveCartItem(singleCart.id)}>
            Remove from Cart
          </Button>
          <Button
            onClick={() =>
              handlePurchaseCar(
                singleCart.car.model,
                singleCart.car.price,
                singleCart.car.id,
                singleCart.id
              )
            }
          >
            Purchase Car
          </Button>
        </div>
      ))}
    </div>
  );
}

export default CartAndCheckout;

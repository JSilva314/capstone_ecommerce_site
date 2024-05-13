import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Cart({ user }) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  console.log(user);
  const getToken = () => {
    return localStorage.getItem("TOKEN");
  };

  useEffect(() => {
    async function fetchCart() {
      try {
        const token = getToken();
        const { data: foundCart } = await axios.get(
          `/api/cart/${user?.id}`
          // , {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        setCart(foundCart);
      } catch (error) {
        console.error(error);
      }
    }
    if (user) {
      fetchCart();
    }
  }, [user]);

  console.log("cart", cart);
  const handleRemoveCartItem = async (cartId) => {
    try {
      await axios.delete(`/api/cart/${cartId}`);
      console.log("Item removed from cart successfully");
      toast.success("Item removed from cart successfully");
      setCart((prevCart) => prevCart.filter((item) => item.id !== cartId));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error("Error removing item from cart");
        console.error("Error status:", error.response.status);
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error:", error.message);
      }
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
          <button
            onClick={() => {
              handleRemoveCartItem(singleCart.id);
            }}
          >
            Cancel My Order
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;

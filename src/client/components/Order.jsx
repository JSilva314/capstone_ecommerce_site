import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderTitle from "./HeaderTitle";
import {
  CircularProgress,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("TOKEN"); // Obtain the user's token from localStorage
        console.log(`Fetching orders for userId: ${user?.id}`);
        const { data } = await axios.get(`/api/orders/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the user's token
          },
        });
        console.log(`Fetched orders: ${JSON.stringify(data, null, 2)}`);
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders");
        setIsLoading(false);
      }
    }
    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(orders);
  return (
    <Box
      sx={{
        backgroundImage: 'url("/car2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 4,
          padding: 4,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <HeaderTitle title="My Orders" />
        {orders.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px,400px))",
              gap: 2,
            }}
          >
            {orders.map((order) => (
              <Card
                key={order.id}
                // className={sparkle[car.id] ? "sparkle" : ""}
                sx={{
                  border: "none",
                  borderRadius: 1.5,
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                {order.car.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={order.car.image}
                    alt={`${order.car.make} ${order.car.model}`}
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ padding: 2.5 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      to={`/cars/${order.car.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {order.car.make} {order.car.model}
                      </Typography>
                    </Link>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ color: "grey.700", fontWeight: "bold" }}
                  >
                    Order ID: {order.orderId}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "green" }}>
                    Price: ${order.car.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    Date Bought: {order.createdAt}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "black", fontWeight: "bold" }}
                  >
                    Address: {order.user.address}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      backgroundColor: "#15379b",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#0d2357",
                      },
                      width: "100%",
                    }}
                    component={Link}
                    to={`/orders/${order.car.id}`}
                  >
                    View Vehicle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Orders;

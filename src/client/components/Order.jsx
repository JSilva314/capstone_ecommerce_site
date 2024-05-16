import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("TOKEN"); // Obtain the user's token from localStorage
        const { data } = await axios.get(`/api/orders/${user?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the user's token
          },
        });
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

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Car</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>
                    {order.car.make} {order.car.model}
                  </TableCell>
                  <TableCell>{order.user.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Orders;

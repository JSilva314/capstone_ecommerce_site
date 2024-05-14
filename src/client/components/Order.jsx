import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const userId = localStorage.getItem("USER_ID"); // Obtain the user ID from the authentication system
        const token = localStorage.getItem("TOKEN"); // Obtain the user's token from localStorage
        const { data } = await axios.get(`/api/orders/orders/${userId}`, {
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
    fetchOrders();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>
              Order ID: {order.orderId}, Car: {order.car.make} {order.car.model}, 
              User ID: {order.user.id}, Date: {order.createdAt}, Payment Method: 
              {order.paymentMethod}, Email: {order.email}, Address: {order.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
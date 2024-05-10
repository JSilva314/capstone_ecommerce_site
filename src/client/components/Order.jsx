import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        // const userId = /* need to get the user's ID */;
        const { data } = await axios.get(`/api/orders/orders/${userId}`);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            Order ID: {order.orderId}, Car: {order.car.model}, User ID:{" "}
            {order.userId}, Date: {order.createdAt}, Payment Method:{" "}
            {order.paymentMethod}, Email: {order.email}, Address:{" "}
            {order.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
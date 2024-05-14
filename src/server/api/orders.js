const express = require('express');
const ordersRouter = express.Router();
const prisma = require("../client");

// GET list of all orders for a specific member
ordersRouter.get("/orders/:userId",  async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await prisma.orderHistory.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        car: true,
      },
    });
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); 
  }
});

// GET 1 specific order based on ID
ordersRouter.get("/orders/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await prisma.orderHistory.findUnique({
      where: {
        orderId: parseInt(orderId),
      },
      include: {
        car: true,
      },
    });
    if (!order) {
      return res.status(404).send("Order not Found");
    }
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error")
  }
});

module.exports = ordersRouter;
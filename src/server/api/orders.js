const express = require("express");
const ordersRouter = express.Router();
const prisma = require("../client");

// GET list of all orders for a specific member
ordersRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching orders for userId: ${userId}`);
  try {
    const orders = await prisma.orderHistory.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        car: true,
        user: true,
      },
    });
    console.log(`Fetched orders: `, orders);
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = ordersRouter;

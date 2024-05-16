const express = require("express");
const ordersRouter = express.Router();
const prisma = require("../client");

// GET list of all orders for a specific member
ordersRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
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
    console.log(orders);
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = ordersRouter;

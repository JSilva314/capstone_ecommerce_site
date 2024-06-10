const express = require("express");
const cartRouter = express.Router();
const prisma = require("../client");

// GET list of all cart items
cartRouter.get("/", async (req, res, next) => {
  try {
    const cart = await prisma.cart.findMany({
      include: {
        car: true,
        user: true,
      },
    });
    console.log(cart);
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// GET cart items for a specific user
cartRouter.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId); // Convert userId to integer

  try {
    // Query the database to retrieve cart items for the specified user ID
    const cartItems = await prisma.cart.findMany({
      where: {
        userId: userId, // Filter by userId
      },
      include: {
        car: true,
        user: true,
      },
    });

    res.status(200).json(cartItems); // Send the cart items as JSON response
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET 1 specific car based on ID
cartRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await prisma.cart.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        car: true,
        user: true,
      },
    });
    res.status(200).send(car);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// POST add a car to the cart
cartRouter.post("/", async (req, res, next) => {
  const { carId, userId } = req.body;
  console.log("Received request to add car to cart:", { carId, userId });
  try {
    // Check if the user already has the car in the cart
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        carId: parseInt(carId),
        userId: parseInt(userId),
      },
    });

    if (existingCartItem) {
      // If the car is already in the user's cart, return a conflict response
      return res
        .status(409)
        .send({ message: "The car is already in the cart" });
    }

    // If the car is not in the user's cart, create a new cart item
    const singleItem = await prisma.cart.create({
      data: {
        carId: parseInt(carId),
        userId: parseInt(userId),
      },
    });

    res.status(201).send(singleItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE a cart item
cartRouter.delete("/:cartId", async (req, res) => {
  const { cartId } = req.params;

  try {
    // If the cart item exists, delete it
    await prisma.cart.delete({
      where: {
        id: parseInt(cartId),
      },
    });

    res.status(200).send({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Purchase a car from the cart
cartRouter.post("/purchase/:cartId", async (req, res, next) => {
  const { cartId } = req.params;

  try {
    // Update the cart item to mark it as purchased
    const updatedCartItem = await prisma.cart.update({
      where: {
        id: parseInt(cartId),
      },
      data: {
        purchased: true,
      },
    });

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error("Error purchasing car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = cartRouter;

const express = require("express");
const carsRouter = express.Router();
const prisma = require("../client");

// GET list of all cars
carsRouter.get("/cars", async (req, res, next) => {
  try {
    const cars = await prisma.cars.findMany();
    res.status(200).send(cars);
  } catch (error) {
    console.log(error);
  }
});

// GET 1 specific car based on ID 
carsRouter.get("/cars/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await prisma.cars.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(200).send(car);
  } catch (error) {
    console.log(error);
  }
});

module.exports = carsRouter;

const express = require("express");
const carsRouter = express.Router();
const prisma = require("../client");
// const { Details } = require("@mui/icons-material");

// GET list of all cars
carsRouter.get("/", async (req, res, next) => {
  console.log("cars hello", req);
  try {
    const cars = await prisma.cars.findMany({
      where: {
        sold: false,
      },
    });
    res.status(200).send(cars);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

// GET only new cars
carsRouter.get("/new", async (req, res, next) => {
  try {
    const newCars = await prisma.cars.findMany({
      where: {
        newUsed: true,
      },
    });
    res.status(200).send(newCars);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET 1 specific car based on ID
carsRouter.get("/:id", async (req, res, next) => {
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
carsRouter.post("/", async (req, res, next) => {
  const {
    make,
    model,
    newUsed,
    color,
    bodyType,
    year,
    image,
    price,
    vin,
    userId,
  } = req.body;
  try {
    const car = await prisma.cars.create({
      data: {
        make,
        model,
        newUsed,
        color,
        bodyType,
        year,
        image,
        price,
        vin,
        userId,
      },
    });
    res.status(201).send(car);
  } catch (error) {
    console.error(error);
  }
});

module.exports = carsRouter;

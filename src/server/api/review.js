const express = require("express");
const router = express.Router();
const prisma = require("../client");
const { verify } = require("jsonwebtoken");

router.post("/car/:id", verify, async (req, res, next) => {
  const { review } = req.body;
  const { id } = req.params;
  console.log("user", id);
  try {
    const review = await prisma.review.create({
      data: {
        review,
        userId: req.user.id,
        carId: +id,
      },
    });
    res.status(201).send(review);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;

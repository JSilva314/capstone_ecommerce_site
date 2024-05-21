const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const prisma = require("../client");

const webhookRouter = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

webhookRouter.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("first");
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        console.log("1");
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case "checkout.session.async_payment_succeeded":
        console.log("2");
        break;
      case "checkout.session.async_payment_failed":
        console.log("3");
        break;
      case "checkout.session.expired":
        console.log("4");
        break;
      // Add more event types if needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.sendStatus(200);
  }
);

const handleCheckoutSessionCompleted = async (session) => {
  const { carId, userId, cartId } = session.metadata;
  console.log(
    `Checkout session completed for carId: ${carId}, userId: ${userId}, cartId: ${cartId}`
  );
  try {
    const singleItem = await prisma.orderHistory.create({
      data: {
        carId: parseInt(carId),
        userId: parseInt(userId),
      },
    });
    console.log(`Created order: ${JSON.stringify(singleItem, null, 2)}`);

    // If the cart item exists, delete it
    await prisma.cart.delete({
      where: {
        id: parseInt(cartId),
      },
    });
    console.log("Order created and car removed from cart");
  } catch (error) {
    console.log("Error in handleCheckoutSessionCompleted:", error);
  }
};

module.exports = webhookRouter;

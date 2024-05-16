const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");

const stripeRouter = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

stripeRouter.post("/create-checkout-session", async (req, res) => {
  const { productName, productPrice, carId, userId, cartId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "wechat_pay", "cashapp", "amazon_pay"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
            },
            unit_amount: productPrice * 100, // price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_options: {
        wechat_pay: {
          client: "web",
        },
      },
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      metadata: {
        carId: carId,
        userId: userId,
        cartId: cartId,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = stripeRouter;

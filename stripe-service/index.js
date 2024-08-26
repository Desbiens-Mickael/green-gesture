import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/payment", cors(), async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: `${req.body.firstName} ${req.body.lastName}`,
    });
    const priceId = process.env.STRIPE_PRICE_ID;

    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
        payment_method_types: ["card"],
      },
      expand: ["latest_invoice.payment_intent"],
    });

    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment Failed",
    });
  }
});

app.post("/unsubscribe", cors(), async (req, res) => {
  try {
    const subscriptionId = req.body.subscriptionId;
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: true,
      }
    );
    res.send({
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.send({
      success: false,
    });
  }
});

app.listen(4002, () => {
  console.log("Server is listening on port 4002 🚀");
});

require("dotenv").config(); // Load environment variables from .env file
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY); // Log the Stripe secret key

// Other necessary imports
const express = require("express"); // Import Express framework
const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON bodies

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Great!!"); // Send a response for the root URL
});

// Define a route to create a payment
app.post("/payment/create", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: "usd", // Currency
    });
    res.send({
      clientSecret: paymentIntent.client_secret, // Send the client secret to the client
    });
  } catch (error) {
    console.error("Error creating payment intent:", error); // Log any errors
    res.status(500).send({ error: error.message }); // Send error response
  }
});

const port = 5000; // Define the port number
app.listen(port, () => {
  console.log(`Server is running on port ${port} http://localhost:${port}`); // Log the server start
});

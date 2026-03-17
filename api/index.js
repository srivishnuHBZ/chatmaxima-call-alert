require("dotenv").config();

const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/chatmaxima-webhook", async (req, res) => {
  try {
    await client.calls.create({
      twiml: "<Response><Say>Customer needs your attention.</Say></Response>",
      to: process.env.TWILIO_TO_NUMBER,
      from: process.env.TWILIO_FROM_NUMBER
    });

    res.status(200).send("ok");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("error");
  }
});

module.exports = app;
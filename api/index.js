require("dotenv").config();

const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

app.get("/", (req, res) => {
  res.status(200).send("ChatMaxima call alert is running");
});

app.post("/chatmaxima-webhook", async (req, res) => {
  try {
    const message =
      req.body.message ||
      req.body.text ||
      req.body?.data?.message ||
      "";

    if (message && message.toLowerCase().includes("agent")) {
      await client.calls.create({
        twiml: "<Response><Say>Customer needs your attention.</Say></Response>",
        to: process.env.TWILIO_TO_NUMBER,
        from: process.env.TWILIO_FROM_NUMBER,
      });
    }

    res.status(200).send("ok");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("error");
  }
});

module.exports = app;
require("dotenv").config();

const express = require("express");
const twilio = require("twilio");

const app = express();
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

app.post("/chatmaxima-webhook", async (req, res) => {
    try {
        const message = req.body.message;

        if (message && message.toLowerCase().includes("agent")) {
            await client.calls.create({
                twiml: "<Response><Say>Customer needs your attention.</Say></Response>",
                to: process.env.TWILIO_TO_NUMBER,
                from: process.env.TWILIO_FROM_NUMBER
            });
        }

        res.status(200).send("ok");
    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).send("error");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
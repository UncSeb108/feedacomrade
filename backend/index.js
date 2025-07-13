require("dotenv").config();
const express = require("express");
const cors = require("cors"); // <-- ✅ add this
const stkPush = require("./mpesa/stkPush");
const callbackHandler = require("./mpesa/callback");

const app = express();

app.use(cors()); // <-- ✅ enable CORS globally
app.use(express.json());

// Route to trigger donation (STK push)
app.post("/api/donate", stkPush);

// Callback endpoint for M-Pesa
app.post("/api/callback", callbackHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const stkPush = require("./mpesa/stkPush");
const callbackHandler = require("./mpesa/callback");
const register = require("./auth/register");
const login = require("./auth/login");

const app = express();
app.use(express.json());

app.post("/api/donate", stkPush);
app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/callback", callbackHandler);
app.use("/api/receipts", express.static("receipts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

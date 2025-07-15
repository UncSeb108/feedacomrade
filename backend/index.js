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
const statusMap = require("./statusMap");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/api/status/:id", (req, res) => {
  const result = statusMap.get(req.params.id);
  if (result) {
    console.log("STATUS CHECK:", req.params.id, result);
    return res.json(result);
  } else {
    console.log("STATUS PENDING:", req.params.id);
    return res.json({ status: "pending" });
  }
});

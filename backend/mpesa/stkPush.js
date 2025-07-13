const axios = require("axios");
const generateAccessToken = require("./acessToken");

// ✅ Helper to get current timestamp in format YYYYMMDDHHMMSS
const getTimestamp = () => {
  const now = new Date();
  return (
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0")
  );
};

// ✅ Helper to generate password
const generatePassword = (timestamp) => {
  const shortCode = process.env.SHORTCODE;
  const passkey = process.env.PASSKEY;
  return Buffer.from(shortCode + passkey + timestamp).toString("base64");
};

// ✅ Exporting route handler to be used in /api/donate
module.exports = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ error: "Phone and amount are required." });
    }

    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);
    const token = await generateAccessToken();

    const payload = {
      BusinessShortCode: process.env.SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: "FeedTheirFuture",
      TransactionDesc: "Donation",
    };

    console.log("📤 Sending STK Push payload:", payload);

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ STK Push initiated:", response.data);
    res.status(200).json({
      message: "STK push initiated successfully",
      data: response.data,
    });
  } catch (error) {
    const safError = error.response?.data || error.message;
    console.error("🔥 STK Push Error:", safError);
    res.status(500).json({ error: "Failed to initiate STK push." });
  }
};

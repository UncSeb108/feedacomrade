const axios = require("axios");
const generateAccessToken = require("./acessToken");

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

const generatePassword = (timestamp) => {
  const shortCode = process.env.MPESA_PAYBILL;
  const passkey = process.env.MPESA_PASSKEY;
  return Buffer.from(shortCode + passkey + timestamp).toString("base64");
};

module.exports = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const parsedAmount = parseInt(amount);

    if (!phone || isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ error: "Valid phone and amount are required." });
    }

    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);
    const token = await generateAccessToken();

    const payload = {
      BusinessShortCode: process.env.MPESA_PAYBILL,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: parsedAmount,
      PartyA: phone,
      PartyB: process.env.MPESA_PAYBILL,
      PhoneNumber: phone,
      CallBackURL: process.env.CALLBACK_URL,
      AccountReference: "FeedTheirFuture",
      TransactionDesc: "Donation",
    };

    console.log("Sending STK Push payload:", payload);

    const response = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("STK Push initiated:", response.data);

    if (
      response.data.ResponseCode === "0" &&
      response.data.CheckoutRequestID
    ) {
      return res.status(200).json({
        message: "STK push initiated successfully",
        data: {
          checkoutRequestId: response.data.CheckoutRequestID,
        },
      });
    } else {
      // Safaricom responded but did not initiate STK push
      return res.status(400).json({
        error: "Failed to initiate STK Push",
        details: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      // Safaricom responded with a status code outside 2xx
      console.error("Safaricom API Error:");
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return res.status(500).json({
        error: "Safaricom API Error",
        status: error.response.status,
        details: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response
      console.error("No response from Safaricom:", error.request);
      return res.status(500).json({
        error: "No response from Safaricom",
      });
    } else {
      // Something else happened
      console.error("Error setting up STK Push:", error.message);
      return res.status(500).json({
        error: "Error setting up STK Push",
        message: error.message,
      });
    }
  }
};
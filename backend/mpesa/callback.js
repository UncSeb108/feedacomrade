const supabase = require("../lib/supabaseClient");
const sendSMS = require("../lib/sms");

const callbackHandler = async (req, res) => {
  console.log("M-Pesa callback received:", JSON.stringify(req.body, null, 2));

  const callback = req.body?.Body?.stkCallback;

  if (!callback) {
    console.warn("⚠️ Callback structure invalid or test request");
    return res.status(400).json({ message: "Invalid callback payload" });
  }

  if (callback.ResultCode === 0) {
    const metadata = callback.CallbackMetadata.Item;
    const amount = metadata.find((i) => i.Name === "Amount")?.Value;
    const phone = metadata.find((i) => i.Name === "PhoneNumber")?.Value;
    const receipt = metadata.find(
      (i) => i.Name === "MpesaReceiptNumber"
    )?.Value;

    console.log(`✅ Donation of KES ${amount} received from ${phone}`);

    // Save to Supabase
    const { error } = await supabase
      .from("donations")
      .insert([{ amount, phone, receipt_number: receipt }]);

    if (error) {
      console.error("❌ Failed to save donation to Supabase:", error.message);
    } else {
      console.log("💾 Donation saved to Supabase");
    }

    // Send SMS confirmation
    const message = `Thank you for your donation of KES ${amount}. Receipt: ${receipt}`;
    await sendSMS(phone, message);
  } else {
    console.log("❌ Donation failed or canceled:", callback.ResultDesc);
  }

  res.status(200).json({ message: "Callback processed successfully." });
};

module.exports = callbackHandler;

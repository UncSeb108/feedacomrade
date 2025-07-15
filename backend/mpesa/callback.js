const supabase = require("../lib/supabaseClient");
const sendSMS = require("../lib/sms");
const statusMap = require("../statusMap");

const callbackHandler = async (req, res) => {
  console.log("📩 M-Pesa callback received:", JSON.stringify(req.body, null, 2));

  const callback = req.body?.Body?.stkCallback;

  if (!callback || typeof callback !== "object") {
    console.warn("⚠️ Invalid callback structure");
    return res.status(400).json({ message: "Invalid callback payload" });
  }

  const {
    ResultCode,
    ResultDesc,
    CallbackMetadata,
    MerchantRequestID,
    CheckoutRequestID,
  } = callback;

  const checkoutId = CheckoutRequestID || MerchantRequestID;
  if (!checkoutId) {
    console.warn("⚠️ Missing CheckoutRequestID");
    return res.status(400).json({ message: "Missing transaction ID" });
  }

  // ❌ Handle failure
  if (ResultCode !== 0) {
    statusMap.set(checkoutId, {
      status: "failed",
      message: ResultDesc || "M-Pesa transaction failed",
    });
    console.warn("❌ M-Pesa transaction failed:", ResultDesc);
    return res.status(200).json({ message: "Failure recorded" });
  }

  // ✅ Handle success
  const items = CallbackMetadata?.Item || [];
  const amount = items.find(i => i.Name === "Amount")?.Value;
  const phone = items.find(i => i.Name === "PhoneNumber")?.Value;
  const receipt = items.find(i => i.Name === "MpesaReceiptNumber")?.Value;

  if (!amount || !phone || !receipt) {
    console.warn("⚠️ Missing important metadata:", { amount, phone, receipt });
    statusMap.set(checkoutId, {
      status: "failed",
      message: "Missing metadata from M-Pesa",
    });
    return res.status(400).json({ message: "Incomplete donation data" });
  }

  // ✅ Mark status as successful so frontend can stop polling
  statusMap.set(checkoutId, {
    status: "success",
    data: { amount, phone, receipt },
  });
  console.log(`✅ Donation of KES ${amount} from ${phone} | Receipt: ${receipt}`);

  // 🚫 Check if receipt already exists
  const { data: existing, error: checkError } = await supabase
    .from("donations")
    .select("id")
    .eq("receipt_number", receipt)
    .maybeSingle();

  if (existing) {
    console.log("ℹ️ Duplicate receipt detected — skipping insert.");
    return res.status(200).json({ message: "Duplicate donation ignored." });
  }

  // 📝 Save to Supabase
  const { error } = await supabase
    .from("donations")
    .insert([{ amount, phone, receipt_number: receipt }]);

  if (error) {
    console.error("❌ Failed to save donation to Supabase:", error.message);
    return res.status(500).json({ message: "Error saving donation" });
  }

  console.log("✅ Donation saved to Supabase");

  // 📲 Send Thank You SMS
  try {
    const message = `Thank you for your donation of KES ${amount}. Receipt: ${receipt}`;
    const smsRes = await sendSMS(phone, message);
    console.log("📨 SMS sent:", smsRes);
  } catch (smsError) {
    console.warn("⚠️ Failed to send SMS:", smsError.message || smsError);
  }

  res.status(200).json({ message: "Callback processed successfully." });
};

module.exports = callbackHandler;

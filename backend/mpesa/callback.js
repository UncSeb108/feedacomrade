const supabase = require("../lib/supabaseClient");
const sendSMS = require("../lib/sms");

const callbackHandler = async (req, res) => {
  console.log("M-Pesa callback received:", JSON.stringify(req.body, null, 2));

  const callback = req.body?.Body?.stkCallback;

  if (!callback || typeof callback !== "object") {
    console.warn("Invalid callback structure");
    return res.status(400).json({ message: "Invalid callback payload" });
  }

  const { ResultCode, CallbackMetadata, ResultDesc } = callback;

  if (ResultCode === 0) {
    const amount = CallbackMetadata?.Item?.find(
      (i) => i.Name === "Amount"
    )?.Value;
    const phone = CallbackMetadata?.Item?.find(
      (i) => i.Name === "PhoneNumber"
    )?.Value;
    const receipt = CallbackMetadata?.Item?.find(
      (i) => i.Name === "MpesaReceiptNumber"
    )?.Value;

    if (!amount || !phone || !receipt) {
      console.warn("Missing metadata: ", { amount, phone, receipt });
      return res.status(400).json({ message: "Incomplete donation data" });
    }

    console.log(
      `Donation of KES ${amount} from ${phone} | Receipt: ${receipt}`
    );

    // Prevent duplicate insertion
    const { data: existing, error: checkError } = await supabase
      .from("donations")
      .select("id")
      .eq("receipt_number", receipt)
      .maybeSingle();

    if (existing) {
      console.log("Duplicate receipt detected — skipping insert.");
      return res.status(200).json({ message: "Duplicate donation ignored." });
    }

    const { error } = await supabase
      .from("donations")
      .insert([{ amount, phone, receipt_number: receipt }]);

    if (error) {
      console.error("Failed to save donation to Supabase:", error.message);
      return res.status(500).json({ message: "Error saving donation" });
    }

    console.log("Donation saved to Supabase");

    try {
      const message = `Thank you for your donation of KES ${amount}. Receipt: ${receipt}`;
      const smsRes = await sendSMS(phone, message);
      console.log("SMS sent:", smsRes);
    } catch (smsError) {
      console.warn("Failed to send SMS:", smsError.message || smsError);
    }
  } else {
    console.log(`M-Pesa transaction failed or canceled: ${ResultDesc}`);
  }

  res.status(200).json({ message: "Callback processed successfully." });
};

module.exports = callbackHandler;

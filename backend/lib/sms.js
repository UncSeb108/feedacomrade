const africastalking = require("africastalking")({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: process.env.AFRICASTALKING_USERNAME,
});

const sendSMS = async (phone, message) => {
  try {
    const result = await africastalking.SMS.send({
      to: [phone],
      message,
    });
    console.log("SMS sent:", result);
  } catch (error) {
    console.error("Failed to send SMS:", error.message);
  }
};

module.exports = sendSMS;

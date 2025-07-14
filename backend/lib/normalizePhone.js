const normalizePhone = (rawPhone, forMpesa = false) => {
  if (!rawPhone) throw new Error("No phone number provided");

  // Remove all non-digit characters
  const cleaned = String(rawPhone).replace(/\D/g, "");

  let normalized;

  if (/^2547\d{8}$/.test(cleaned) || /^2541\d{8}$/.test(cleaned)) {
    normalized = cleaned;
  } else if (/^07\d{8}$/.test(cleaned) || /^01\d{8}$/.test(cleaned)) {
    normalized = `254${cleaned.substring(1)}`;
  } else if (/^\+2547\d{8}$/.test(rawPhone) || /^\+2541\d{8}$/.test(rawPhone)) {
    normalized = rawPhone.replace("+", "");
  } else {
    throw new Error(
      "Invalid phone format. Use 07..., 01..., 2547..., or +2547..."
    );
  }

  // Return with or without "+" depending on context
  return forMpesa ? normalized : `+${normalized}`;
};


module.exports = normalizePhone;

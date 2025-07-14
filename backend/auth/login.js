const supabase = require("../lib/supabaseClient");
const { comparePassword } = require("../lib/hashUtils");

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing credentials." });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error || !user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

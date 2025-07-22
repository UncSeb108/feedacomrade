const supabase = require("../lib/supabaseClient");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user already exists
    const { data: existingUser, error: existingError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error.message || error);
      return res.status(500).json({ error: "Failed to create user." });
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
      },
    });
  } catch (err) {
    console.error("Registration failed:", err.message || err);
    res.status(500).json({ error: "Registration failed." });
  }
};

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173"], 
}));
app.use(express.json());


const MOCK_USER = {
  email: "test@netflix.com",
  password: "password123",
  name: "Mock User",
};

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }


  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    return res.json({ success: true, message: "Login successful", user: { name: MOCK_USER.name, email: MOCK_USER.email } });
  } else {
    return res.status(401).json({ success: false, message: "Invalid Email and Password" });
  }
});


app.get("/", (req, res) => res.send("Server running"));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

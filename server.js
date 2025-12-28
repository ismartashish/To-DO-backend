const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* ================= CORS (FINAL) ================= */
app.use(
  cors({
    origin: "https://routinetodo.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", (req, res) => {
  res.sendStatus(204);
});

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/authRoutes"));

/* ================= TEST ================= */
app.get("/api/test", (req, res) => {
  res.send("API OK");
});

/* ================= DB ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(console.error);

/* ================= FALLBACK ================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: "https://tubular-entremet-720837.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ===== SAFE PREFLIGHT HANDLER (Node 22 FIX) ===== */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "https://tubular-entremet-720837.netlify.app");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    return res.sendStatus(204);
  }
  next();
});

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/authRoutes"));

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
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

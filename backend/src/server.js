const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

// simple test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

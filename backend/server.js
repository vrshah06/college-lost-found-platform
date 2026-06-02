const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const claimRoutes = require("./routes/claimRoutes");
app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => {
  res.send("CampusConnect API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
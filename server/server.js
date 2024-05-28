require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors({ origin: process.env.APP_URL, credentials: true }));
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const root = require("./routes/root");
const seed = require("./data/seed");

connectDB();
seed();

app.use(express.json());
app.use(cookieParser());

app.use("/", root);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

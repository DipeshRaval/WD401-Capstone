const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const electionRoutes = require("./routes/election");
const userRoutes = require("./routes/user");
const votersRoutes = require("./routes/voters");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("Some secret String"));

// Routes
app.use("/user", userRoutes);
app.use("/election", electionRoutes);
app.use("/voter", votersRoutes);

module.exports = app;

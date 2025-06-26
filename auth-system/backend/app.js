const express = require("express");
const cors = require("cors");
const authService = require("./services/auth.service");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database and create admin users
authService.initializeDatabase();

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to authentication application." });
});

// Routes
require("./routes/auth.routes")(app);

module.exports = app;
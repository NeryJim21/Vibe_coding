const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).send({ message: "User registered successfully!", userId: user.id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(200).send(result);
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};
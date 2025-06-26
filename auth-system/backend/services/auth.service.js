const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.register = async (userData) => {
  // Check if username already exists
  const existingUser = await User.findOne({ where: { username: userData.username } });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(userData.password, 8);

  // Create user
  const user = await User.create({
    username: userData.username,
    password: hashedPassword
  });

  return user;
};

exports.login = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error("User Not Found");
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: config.jwtExpiration
  });

  return {
    id: user.id,
    username: user.username,
    accessToken: token
  };
};

exports.initializeDatabase = async () => {
  try {
    // Authenticate and sync database
    await db.sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    
    // Sync all models
    await db.sequelize.sync({ force: true }); // force: true will drop the table if it already exists
    console.log('Database synchronized.');
    
    // Create initial admin users
    const admin1 = await this.register({
      username: 'admin1',
      password: 'admin123'
    });
    
    const admin2 = await this.register({
      username: 'admin2',
      password: 'admin123'
    });
    
    console.log('Initial admin users created:', admin1.username, admin2.username);
  } catch (error) {
    console.error('Unable to initialize database:', error);
    process.exit(1);
  }
};
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    "It is my Secret",
    {
      expiresIn: "7d",
    }
  );

  return token;
};

module.exports = generateToken;

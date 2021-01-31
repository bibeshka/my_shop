const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id.toString(),
      //   name: user.name,
      //   email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id.toString(),
      //   name: user.name,
      //   email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };

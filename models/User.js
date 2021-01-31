const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    lowercase: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minlength: 8,
  },
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       require: true,
  //     },
  //   },
  // ],
  token: {
    accessToken: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: String,
      require: true,
    },
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  // delete userObject.tokens;
  delete userObject.token;

  return userObject;
};

//generate auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const accessToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET
  );

  const refreshToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET
  );

  user.token.accessToken = accessToken;

  user.token.refreshToken = refreshToken;

  await user.save();

  return { accessToken, refreshToken };
};

//generate refresh token
// userSchema.method.generateRefreshToken = async function () {
//   const user = this;
//   const refreshToken = jwt.sign(
//     { _id: user._id.toString() },
//     process.env.REFRESH_TOKEN_SECRET
//   );

//   user.token.refreshToken = refreshToken;
//   await user.save();

//   return refreshToken;
// };

//Login check
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

//hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

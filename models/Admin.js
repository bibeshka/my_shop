const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
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
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.password;
  delete adminObject.tokens;

  return adminObject;
};

//generate auth toket
adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() }, "thisismyshop");

  admin.tokens = admin.tokens.concat({ token });
  await admin.save();

  return token;
};

//Login check
adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return admin;
};

//hash the plain text password before saving
adminSchema.pre("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }

  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

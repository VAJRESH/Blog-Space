const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: { type: String, trim: true, required: true, max: 32 },
    email: { type: String, trim: true, required: true, max: 32, unique: true },
    profile: { type: String, required: true },
    hashed_password: { type: String, required: true },
    salt: String,
    about: { type: String },
    role: { type: Number, default: 0 },
    photo: { type: Buffer, contentType: String },
    resetPasswordLink: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// plain password String is salted and saved in hashed_password in db
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  isPasswordCorrect: function (password) {
    return this.encryptPassword(password) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);

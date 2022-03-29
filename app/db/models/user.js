const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const { validateEmail } = require("../validators");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Nazwa uzytkownika nie moze byc pusta!"],
      match: [/^[a-zA-Z0-9]+$/, "Niepoprawne znaki!"],
      index: true,
      min: 6,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email nie moze byc pusty!"],
      validate: [validateEmail, "Niepoprawny adres Email!"],
      index: true,
      min: 6,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [4, "Hasło powinno posiadać min. 4 znaki"],
    },
    image: { type: String },
    isAdmin: { type: Boolean, default: true },
    isModerator: { type: Boolean, default: true },
    isbanned: { type: Boolean, default: false },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator, {
  message: "Ten adres email jest juz zajety!.",
});

userSchema.path("password").set((value) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
});
userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

const User = mongoose.model("Users", userSchema);

module.exports = User;

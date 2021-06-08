const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {type: String, required: true, maxLength: 100},
    password: {type: String, required: true, maxLength: 100},
    user_type: {type: String, default: "normal"},
  }
);

UserSchema.pre("save", async function (next) {
    //hash password
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

//Export model
module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email_id: String,
  password: String,
  reason: String

});

const UserModel = mongoose.model('user_model', UserSchema);

module.exports = UserModel;

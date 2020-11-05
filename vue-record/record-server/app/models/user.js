const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
    userId: {  // 在需要取出来的值后面加上require
      type: String,
      unique: true,
      require: true
    },
    account: {
      type: String
    },
    userName: {
      type: String
    },
    headerImg: {
      type: String
    },
    signature: {
      type: String
    }
  }, { collection: 'user', versionKey: false});
  
  module.exports = mongoose.model('user', UserSchema);
  
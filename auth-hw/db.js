const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/auth-hw');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
	shoppinglist: {
		type:	Array,
		required: false
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};


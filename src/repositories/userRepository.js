const User = require('../models/user');

class UserRepository {
  async createUser(email, password) {
    const user = new User({
      email,
      password,
    });
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = new UserRepository();

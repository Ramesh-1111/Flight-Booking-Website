const User = require('./userModel');

class UserService {
  static async createUser(user) {
    const newUser = new User(user);
    return newUser.save();
  }

  static async getUsers() {
    return User.find();
  }
  
  static async getUserById(id) {
    return User.findById(id);
  }

  static async updateUser(id, updatedUser) {
    return User.findByIdAndUpdate(id, updatedUser, { new: true });
  }

  static async deleteUser(id) {
    return User.findByIdAndDelete(id);
  }
}

module.exports = UserService;

const UserService = require('./userService');

class UserController {
  static async createUser(req, res) {
    try {
      const user = req.body;
      const createdUser = await UserService.createUser(user);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }
  

  static async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await UserService.getUserById(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      const updatedUser = req.body;
      const user = await UserService.updateUser(id, updatedUser);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await UserService.deleteUser(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}

module.exports = UserController;

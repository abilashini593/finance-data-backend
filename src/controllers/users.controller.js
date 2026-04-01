const UserModel = require('../models/user.model');

async function getUsers(req, res, next) {
  try {
    const users = await UserModel.getAllUsers();
    res.json({ users });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

async function updateUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['Viewer', 'Analyst', 'Admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be Viewer, Analyst, or Admin.' });
    }

    const user = await UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await UserModel.updateUserRole(id, role);
    
    res.json({ message: 'User role updated successfully', role });
  } catch (error) {
    next(error);
  }
}

async function updateUserStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['active', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be active or inactive.' });
    }

    const user = await UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await UserModel.updateUserStatus(id, status);

    res.json({ message: 'User status updated successfully', status });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUserRole,
  updateUserStatus
};

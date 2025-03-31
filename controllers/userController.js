const mongoose = require('mongoose');
const User = require('../models/user.js');

// @desc    Get all users
// @route   GET /api/users
// @access  Admin only
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords from response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get a user by ID
// @route   GET /api/users/:id
// @access  Admin & Self
const getUserById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID" });
    }
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user details
// @route   PUT /api/users/:id
// @access  Admin & Self
const updateUser = async (req, res) => {
    try {
        const { name, email, role, collegeId, examId, examCentreId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Incorrect ID" });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.collegeId = collegeId || user.collegeId;
        user.examId = examId || user.examId;
        user.examCentreId = examCentreId || user.examCentreId;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Admin only
const deleteUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Incorrect ID" });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getUsers, getUserById, deleteUser, updateUser };



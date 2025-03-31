const express = require('express');
// const { protect, roleCheck } = require('../middleware/authMiddleware.js');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController.js');
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/:id', updateUser);
router.get('/:id', deleteUser);




module.exports = router;

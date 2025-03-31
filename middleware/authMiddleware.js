// const jwt = require('jsonwebtoken');
// const User = require('../models/user.js');

// const protect = async (req, res, next) => {
//     let token = req.headers.authorization;

//     if (token && token.startsWith('Bearer')) {
//         try {
//             token = token.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized, invalid token' });
//         }
//     } else {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };

// const roleCheck = (roles) => (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ message: 'Forbidden: Access Denied' });
//     }
//     next();
// };

// module.exports = { protect, roleCheck };

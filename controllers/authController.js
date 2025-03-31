const User = require('../models/user.js');
const bcrypt = require('bcryptjs'); // Make sure to use the same library consistently
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Admin only
// const registerUser = async (req, res) => {
//     try {
//         const { name, userId, email, password, role, collegeId, examId, examCentreId } = req.body;

//         // Check if user already exists
//         let userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password correctly
//         const hashedPassword = await bcrypt.hash(password, 10); // Directly passing 10 as salt rounds

//         // Create new user
//         const user = await User.create({
//             name,
//             userId,
//             email,
//             password: hashedPassword, // Storing hashed password
//             role,
//             collegeId,
//             examId,
//             examCentreId
//         });

//         res.status(201).json({ message: 'User registered successfully', userId: user.userId });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn : "10d"});
};


const registerUser =  async (req, res) => {
    //Grab Data form body
    const { name, userId, email, password, role, collegeId, examId, examCentreId } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Email and Password are required"});
    }

    const exist = await User.findOne({email})
    if(exist){
        return res.status(400).json({message: "Email is already taken"});
    }

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    
    try {
        //registering the user
        const user = await User.create({
            name,
            email,
            password: hashed, // Storing hashed password
            role,
            collegeId,
            examId,
            examCentreId
        });
        const token = createToken(user._id)
        res.status(200).json({email, token});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log("Request Body:", req.body);

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log("User not found for email:", email);
//             return res.status(401).json({ message: 'Invalid email' });
//         }

//         console.log("Stored Hashed Password:", user.password);
//         console.log("Entered Password:", password);

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         console.log("Password Match:", isMatch);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

//         res.status(200).json({ message: 'Login successful', token, role: user.role });
//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Email and Password are required"});
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message: "Incorrect email"});
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return res.status(400).json({message: "Incorrect password"});
    }

    try{
       
        const token = createToken(user._id)
        res.status(200).json({email, token});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


module.exports = { registerUser, loginUser };

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "student", "teacher"], required: true },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  examCentreId: { type: mongoose.Schema.Types.ObjectId, ref: "ExamCentre", required: true }
}, { timestamps: true });

// Hash password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model('User', userSchema);

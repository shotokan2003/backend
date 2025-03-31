const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adminType: { type: String, enum: ['super-admin', 'college-admin', 'exam-admin', 'exam-center-admin'], required: true }
});

module.exports = mongoose.model('Admin', adminSchema);

const mongoose = require('mongoose');

const contentUserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    departmentId: { type: String },
    subjectCode: { type: String },
    subjectName: { type: String }
});

module.exports = mongoose.model('ContentUser', contentUserSchema);

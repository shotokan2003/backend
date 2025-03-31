const mongoose = require('mongoose');

const examUserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examCentreId: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamCentre', required: true }
});

module.exports = mongoose.model('ExamUser', examUserSchema);

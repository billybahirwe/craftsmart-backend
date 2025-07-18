const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [String],
  budget: { type: Number, required: true },
  paymentMethod: { type: String }, // e.g., "cash", "transfer"
  location: { type: String, required: true },
  contactInfo: { type: String },
  status: {
    type: String,
    enum: ['open', 'assigned', 'completed'],
    default: 'open',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Case', caseSchema);

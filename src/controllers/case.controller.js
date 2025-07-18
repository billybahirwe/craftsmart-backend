const Case = require('../models/case.model');

// Create a new case
exports.createCase = async (req, res, next) => {
  try {
    const newCase = new Case({
      ...req.body,
      createdBy: req.user._id,
    });

    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    next(err);
  }
};

// Get all cases
exports.getAllCases = async (req, res, next) => {
  try {
    const cases = await Case.find()
      .populate('createdBy', 'mobileNumber role') // Show employer info
      .populate('assignedTo', 'mobileNumber role'); // If assigned

    res.status(200).json(cases);
  } catch (err) {
    next(err);
  }
};

// Get single case by ID
exports.getCaseById = async (req, res, next) => {
  try {
    const job = await Case.findById(req.params.id)
      .populate('createdBy', 'mobileNumber role')
      .populate('assignedTo', 'mobileNumber role');

    if (!job) return res.status(404).json({ message: 'Case not found' });

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

// Update case
exports.updateCase = async (req, res, next) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCase) return res.status(404).json({ message: 'Case not found' });

    res.status(200).json(updatedCase);
  } catch (err) {
    next(err);
  }
};

// Delete case
exports.deleteCase = async (req, res, next) => {
  try {
    const deleted = await Case.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Case not found' });

    res.json({ message: 'Case deleted' });
  } catch (err) {
    next(err);
  }
};

const Review = require('../models/review.model');

// Create a review
exports.createReview = async (req, res, next) => {
  try {
    const review = new Review({
      ...req.body,
      employer: req.user._id,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

// Get all reviews for a specific craftsman
exports.getReviewsForCraftsman = async (req, res, next) => {
  try {
    const reviews = await Review.find({ craftsman: req.params.craftsmanId })
      .populate('employer', 'mobileNumber')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// Delete a review
exports.deleteReview = async (req, res, next) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};

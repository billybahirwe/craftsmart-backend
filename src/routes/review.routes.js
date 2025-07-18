const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// EMPLOYER: Create review after job is done
router.post(
  '/',
  authMiddleware.verifyToken,
  authMiddleware.allowRoles('employer'),
  reviewController.createReview
);

// ALL ROLES: Get reviews for a craftsman
router.get(
  '/craftsman/:craftsmanId',
  authMiddleware.verifyToken,
  reviewController.getReviewsForCraftsman
);

// ADMIN: Delete inappropriate review
router.delete(
  '/:id',
  authMiddleware.verifyToken,
  authMiddleware.allowRoles('admin'),
  reviewController.deleteReview
);

module.exports = router;

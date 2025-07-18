const express = require('express');
const router = express.Router();
const caseController = require('../controllers/case.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// EMPLOYER: Create a new case
router.post(
  '/',
  authMiddleware.verifyToken,
  authMiddleware.allowRoles('employer'),
  caseController.createCase
);

// ALL ROLES: Get all available cases
router.get(
  '/',
  authMiddleware.verifyToken,
  caseController.getAllCases
);

// ALL ROLES: Get a single case by ID
router.get(
  '/:id',
  authMiddleware.verifyToken,
  caseController.getCaseById
);

// EMPLOYER/ADMIN: Update a case
router.put(
  '/:id',
  authMiddleware.verifyToken,
  authMiddleware.allowRoles('employer', 'admin'),
  caseController.updateCase
);

// ADMIN: Delete a case
router.delete(
  '/:id',
  authMiddleware.verifyToken,
  authMiddleware.allowRoles('admin'),
  caseController.deleteCase
);

module.exports = router;

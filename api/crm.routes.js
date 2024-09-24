import express from 'express';
import * as crmController from './crm.controller.js';
import { verifyToken } from './middleware/auth.js';

const router = express.Router();

// Login endpoint (no token required)
router.post('/login', crmController.login);

// Protected routes (token required)
router.get('/donaciones', verifyToken, crmController.getDonaciones);
router.put('/donaciones/:id', verifyToken, crmController.updateDonacion);
router.post('/donaciones', verifyToken, crmController.createDonacion);
router.delete('/donaciones/:id', verifyToken, crmController.deleteDonacion);

// Remove for prod (token required)
router.post('/user', crmController.createUser);

// Get one (token required)
router.get('/donaciones/:id', verifyToken, crmController.getOneDonacion);

export { router };
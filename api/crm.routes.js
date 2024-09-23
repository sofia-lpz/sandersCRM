import express from 'express';
import * as crmController from './crm.controller.js';
import { verifyToken } from './middleware/auth.js';

const router = express.Router();

// Login endpoint (no token required)
router.post('/login', crmController.login);

// Protected routes (token required)
router.get('/donaciones', crmController.getDonaciones);
router.put('/donaciones/:id', crmController.updateDonacion);
router.post('/donaciones', crmController.createDonacion);
router.delete('/donaciones/:id', crmController.deleteDonacion);

// Remove for prod (token required)
router.post('/user', crmController.createUser);

// Get one (token required)
router.get('/donaciones/:id', crmController.getOneDonacion);

export { router };
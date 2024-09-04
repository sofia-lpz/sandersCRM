import express from 'express';
import * as crmController from './crm.controller.js';
import { verifyToken } from './middleware/auth.js';

const router = express.Router();

router.post('/login', crmController.login);

/*

router.get('/donadores', verifyToken, crmController.getDonadores);
router.get('/donadores/:id', verifyToken, crmController.getDonadorById);

router.post('/donadores', verifyToken, crmController.createDonador);
router.put('/donadores/:id', verifyToken, crmController.updateDonador);

router.get('/donadores/:id/donaciones', verifyToken, crmController.getDonacionesByDonadorId);
router.post('/donadores/:id/donaciones', verifyToken, crmController.createDonacion);

router.get('donaciones/:donacionId', verifyToken, crmController.getDonacionById);

router.get('/donaciones/:type', verifyToken, crmController.getDonacionesByType);

router.get('/donaciones/fecha/:date', verifyToken, crmController.getDonacionesByDate);
*/

export { router };
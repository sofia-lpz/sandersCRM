import express from 'express';
import * as crmController from './crm.controller.js';
import { verifyToken } from './middleware/auth.js';
import { checkAdminRole } from './middleware/role.js';

const router = express.Router();

// Login endpoint (no token required)
router.post('/login', crmController.login);

//admin routes
router.get('/usuarios', verifyToken, checkAdminRole, crmController.getUsuarios);
router.put('/usuarios/:id', verifyToken, checkAdminRole, crmController.updateUsuario);
router.post('/usuarios', verifyToken, checkAdminRole, crmController.createUsuario);
router.delete('/usuarios/:id', verifyToken, checkAdminRole, crmController.deleteUsuario);
router.get('/usuarios/:id', verifyToken, checkAdminRole, crmController.getOneUsuario);

// Protected routes (token required)
router.get('/donaciones', verifyToken, crmController.getDonaciones);
router.put('/donaciones/:id', verifyToken, crmController.updateDonacion);
router.post('/donaciones', crmController.createDonacion);
router.delete('/donaciones/:id', verifyToken, crmController.deleteDonacion);
router.get('/donaciones/:id', verifyToken, crmController.getOneDonacion);

router.get('/donantes', verifyToken, crmController.getDonantes);
router.put('/donantes/:id', verifyToken, crmController.updateDonante);
router.post('/donantes', crmController.createDonante);
router.delete('/donantes/:id', verifyToken, crmController.deleteDonante);
router.get('/donantes/:id', verifyToken, crmController.getOneDonante);


router.get('/dashboard/donaciones/total', verifyToken, crmController.getDonacionesDashboardTotal);
router.get('/dashboard/donaciones/:tipo', verifyToken, crmController.getDonacionesDashboard);

export { router };
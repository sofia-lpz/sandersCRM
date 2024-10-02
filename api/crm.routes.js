import express from 'express';
import * as crmController from './crm.controller.js';
import { verifyToken } from './middleware/auth.js';

const router = express.Router();

// Remove for prod
router.post('/user', crmController.createUser);

// Login endpoint (no token required)
router.post('/login', crmController.login);

// Protected routes (token required)
router.get('/donaciones', verifyToken, crmController.getDonaciones);
router.put('/donaciones/:id', verifyToken, crmController.updateDonacion);
router.post('/donaciones', verifyToken, crmController.createDonacion);
router.delete('/donaciones/:id', verifyToken, crmController.deleteDonacion);
router.get('/donaciones/:id', verifyToken, crmController.getOneDonacion);

router.get('/donantes', verifyToken, crmController.getDonantes);
router.put('/donantes/:id', verifyToken, crmController.updateDonante);
router.post('/donantes', verifyToken, crmController.createDonante);
router.delete('/donantes/:id', verifyToken, crmController.deleteDonante);
router.get('/donantes/:id', verifyToken, crmController.getOneDonante);

//dashboard endpointsmake 

//router.get('/dashboard/donantes/:tipo', verifyToken, crmController.getDonantesDashboard);
router.get('/dashboard/donaciones/total', crmController.getDonacionesDashboardTotal);
router.get('/dashboard/donaciones/:tipo', crmController.getDonacionesDashboard);

router.get('/usuarios', verifyToken, crmController.getUsuarios);
router.put('/usuarios/:id', verifyToken, crmController.updateUsuario);
router.post('/usuarios', verifyToken, crmController.createUsuario);
router.delete('/usuarios/:id', verifyToken, crmController.deleteUsuario);
router.get('/usuarios/:id', verifyToken, crmController.getOneUsuario);

export { router };
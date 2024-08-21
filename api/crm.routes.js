import express from 'express'
import * as crmController from './crm.controller.js'

const router = express.Router();

router.get('/donadores', crmController.getDonadores);
router.get('/donadores/:id', crmController.getDonadorById);

router.post('/donadores', crmController.createDonador);
router.put('/donadores/:id', crmController.updateDonador);

router.get('/donadores/:id/donaciones', crmController.getDonacionesByDonadorId);
router.post('/donadores/:id/donaciones', crmController.createDonacion);

router.get('donaciones/:donacionId', crmController.getDonacionById);

router.get('/login', crmController.login);

router.get('/donaciones/:type', crmController.getDonacionesByType);

router.get('/donaciones/fecha/:date', crmController.getDonacionesByDate);


export { router }

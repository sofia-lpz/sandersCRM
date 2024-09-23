import express from 'express';
import * as crmController from './crm.controller.js';
import { verifyToken } from './middleware/auth.js';

const router = express.Router();

// Login endpoint
router.post('/login', crmController.login);

router.get('/donaciones', crmController.getDonaciones);
router.put('/donaciones/:id', crmController.updateDonacion);
router.post('/donaciones', crmController.createDonacion);
router.delete('/donaciones/:id', crmController.deleteDonacion);

// remove for prod
router.post('/user', crmController.createUser);

//get one
router.get('/donaciones/:id', crmController.getOneDonacion);


export { router };
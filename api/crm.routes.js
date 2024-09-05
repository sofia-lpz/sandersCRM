import express from 'express';
import * as crmController from './crm.controller.js';
import { verifyToken } from './middleware/auth.js';

const router = express.Router();

// Login endpoint
router.post('/login', crmController.login);


router.get('/:resource', crmController.getList); // GET List
router.get('/:resource/:id', crmController.getOne); // GET One
router.get('/:resource', crmController.getMany); // GET Many
router.get('/:resource/:id/:relatedResource', crmController.getManyReference); // GET Many Reference

router.post('/:resource', crmController.create); // CREATE
router.put('/:resource/:id', crmController.update); // UPDATE
router.put('/:resource', crmController.updateMany); // UPDATE Many

router.delete('/:resource/:id', crmController.deleteOne); // DELETE
router.delete('/:resource', crmController.deleteMany); // DELETE Many

export { router };
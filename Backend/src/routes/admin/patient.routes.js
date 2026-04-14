const express = require('express');
const patientController = require('../../controllers/admin-patient.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin-Patients
 *   description: Deep extraction APIs for Patient Histories
 */

/**
 * @swagger
 * /api/admin/patients:
 *   get:
 *     summary: List patients
 *     tags: [Admin-Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of registered patients
 */
router.get('/', patientController.getAllPatients);

/**
 * @swagger
 * /api/admin/patients/{id}:
 *   get:
 *     summary: View patient profile
 *     tags: [Admin-Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Full profile schema object
 */
router.get('/:id', patientController.getPatientById);

/**
 * @swagger
 * /api/admin/patients/{id}/appointments:
 *   get:
 *     summary: View patient appointment history
 *     tags: [Admin-Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array mapping bounded appointments and slot relationships
 */
router.get('/:id/appointments', patientController.getPatientAppointments);

/**
 * @swagger
 * /api/admin/patients/{id}/prescriptions:
 *   get:
 *     summary: View patient prescription history
 *     tags: [Admin-Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exhaustive metadata around clinical prescriptions
 */
router.get('/:id/prescriptions', patientController.getPatientPrescriptions);

module.exports = router;

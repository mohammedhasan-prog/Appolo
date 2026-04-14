const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('DOCTOR'));

/**
 * @swagger
 * tags:
 *   name: Doctor
 *   description: Internal facing APIs securely mapping bounds for assigned doctors
 */

/**
 * @swagger
 * /api/doctor/dashboard:
 *   get:
 *     summary: Obtain the doctor analytical dashboard
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard metrics including today's scheduling bounds and revenue
 */
router.get('/dashboard', doctorController.getDashboard);

/**
 * @swagger
 * /api/doctor/schedule:
 *   get:
 *     summary: Complete array of doctor assigned shifts
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of shifts mapped internally
 */
router.get('/schedule', doctorController.getSchedule);

/**
 * @swagger
 * /api/doctor/shifts/{id}/slots:
 *   get:
 *     summary: Expand atomic slots configured across an explicit shift
 *     tags: [Doctor]
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
 *         description: Sequential array of tokens assigned
 */
router.get('/shifts/:id/slots', doctorController.getShiftSlots);

/**
 * @swagger
 * /api/doctor/appointments:
 *   get:
 *     summary: List all active appointments assigned to the logged doctor
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array mapping appointments
 */
router.get('/appointments', doctorController.getDoctorAppointments);

/**
 * @swagger
 * /api/doctor/appointments/{id}:
 *   get:
 *     summary: Obtain explicit granular details around specified booking
 *     tags: [Doctor]
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
 *         description: Full extraction showing internal objects
 */
router.get('/appointments/:id', doctorController.getAppointmentDetail);

/**
 * @swagger
 * /api/doctor/appointments/{id}/status:
 *   patch:
 *     summary: Allows the doctor to modify their explicit appointment state constraints
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [CONFIRMED, COMPLETED, CANCELLED, NO_SHOW]
 *     responses:
 *       200:
 *         description: Target state overwritten
 */
router.patch('/appointments/:id/status', doctorController.updateAppointmentStatus);

/**
 * @swagger
 * /api/doctor/appointments/{id}/video-link:
 *   patch:
 *     summary: Explicit mechanism placing communication URLs
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               consultationLink:
 *                 type: string
 *                 example: "https://zoom.us/j/1234..."
 *     responses:
 *       200:
 *         description: External resource tied successfully
 */
router.patch('/appointments/:id/video-link', doctorController.updateAppointmentVideoLink);

/**
 * @swagger
 * /api/doctor/appointments/{id}/patient-history:
 *   get:
 *     summary: Opens all previous booking contexts relating internally from a validated booking 
 *     tags: [Doctor]
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
 *         description: Historical execution array
 */
router.get('/appointments/:id/patient-history', doctorController.getPatientHistoryForAppointment);

module.exports = router;

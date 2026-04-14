const express = require('express');
const doctorController = require('../../controllers/admin-doctor.controller');
const validate = require('../../middlewares/validate.middleware');
const { 
  createDoctorSchema, 
  updateDoctorStatusSchema, 
  updateDoctorModeSchema, 
  updateDoctorFeeSchema 
} = require('../../validators/admin.validator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin-Doctors
 *   description: Doctor user management APIs
 */

/**
 * @swagger
 * /api/admin/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Admin-Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctors
 *   post:
 *     summary: Create a doctor
 *     tags: [Admin-Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               specialityId:
 *                 type: string
 *               consultationMode:
 *                 type: string
 *                 enum: [ONLINE, OFFLINE]
 *               consultationFee:
 *                 type: number
 *             example:
 *               name: "Dr. Gregory House"
 *               email: "house@hospital.com"
 *               password: "password123"
 *               consultationMode: "OFFLINE"
 *               consultationFee: 300
 *     responses:
 *       201:
 *         description: Doctor created
 */
router.post('/', validate(createDoctorSchema), doctorController.createDoctor);
router.get('/', doctorController.getAllDoctors);

/**
 * @swagger
 * /api/admin/doctors/{id}:
 *   get:
 *     summary: Get a doctor by ID
 *     tags: [Admin-Doctors]
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
 *         description: Doctor data
 *   patch:
 *     summary: Update generic doctor profile
 *     tags: [Admin-Doctors]
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
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.get('/:id', doctorController.getDoctorById);
router.patch('/:id', doctorController.updateDoctorProfile);

/**
 * @swagger
 * /api/admin/doctors/{id}/status:
 *   patch:
 *     summary: Update doctor active status
 *     tags: [Admin-Doctors]
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
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch('/:id/status', validate(updateDoctorStatusSchema), doctorController.updateDoctorStatus);

/**
 * @swagger
 * /api/admin/doctors/{id}/mode:
 *   patch:
 *     summary: Update doctor consultation mode
 *     tags: [Admin-Doctors]
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
 *               consultationMode:
 *                 type: string
 *                 enum: [ONLINE, OFFLINE]
 *     responses:
 *       200:
 *         description: Mode updated
 */
router.patch('/:id/mode', validate(updateDoctorModeSchema), doctorController.updateDoctorMode);

/**
 * @swagger
 * /api/admin/doctors/{id}/fee:
 *   patch:
 *     summary: Update doctor consultation fee
 *     tags: [Admin-Doctors]
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
 *               consultationFee:
 *                 type: number
 *     responses:
 *       200:
 *         description: Fee updated
 */
router.patch('/:id/fee', validate(updateDoctorFeeSchema), doctorController.updateDoctorFee);

module.exports = router;

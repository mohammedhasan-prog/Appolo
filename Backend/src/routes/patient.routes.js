const express = require('express');
const patientController = require('../controllers/patient.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('PATIENT'));

/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: External facing secure APIs for patients to lookup available shifts and lock bookings bounds.
 */

/**
 * @swagger
 * /api/patient/dashboard:
 *   get:
 *     summary: Patient internal dashboard aggregating nested arrays
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard map containing bookings and prescriptions
 */
router.get('/dashboard', patientController.getDashboard);

/**
 * @swagger
 * /api/patient/appointments/upcoming:
 *   get:
 *     summary: Fetches appointments still ahead in time
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array mapping active bounding configurations
 */
router.get('/appointments/upcoming', patientController.getUpcomingAppointments);

/**
 * @swagger
 * /api/patient/appointments/past:
 *   get:
 *     summary: Fetches appointments concluded or cancelled
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array mapping closed historical constraints
 */
router.get('/appointments/past', patientController.getPastAppointments);

/**
 * @swagger
 * /api/patient/doctors:
 *   get:
 *     summary: Obtain external view of public doctors across the application
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: External structured mapping
 */
router.get('/doctors', patientController.getDoctors);

/**
 * @swagger
 * /api/patient/doctors/{id}:
 *   get:
 *     summary: Specific profile drill down for a doctor
 *     tags: [Patient]
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
 *         description: Specific nested model
 */
router.get('/doctors/:id', patientController.getDoctorDetail);

/**
 * @swagger
 * /api/patient/doctors/{id}/availability:
 *   get:
 *     summary: Query the direct scheduled boundaries exposed by a doctor
 *     tags: [Patient]
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
 *         description: Mapped shifts and generic slots
 */
router.get('/doctors/:id/availability', patientController.getDoctorAvailability);

/**
 * @swagger
 * /api/patient/shifts:
 *   get:
 *     summary: Central shift browser limiting exclusively to shifts owning public available slots
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns top level boundaries
 */
router.get('/shifts', patientController.getShifts);

/**
 * @swagger
 * /api/patient/shifts/{id}/slots:
 *   get:
 *     summary: Specific available array list of time bounds under a shift
 *     tags: [Patient]
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
 *         description: Specific slice
 */
router.get('/shifts/:id/slots', patientController.getShiftSlots);

/**
 * @swagger
 * /api/patient/appointments:
 *   post:
 *     summary: Securely execute a transaction map locking the specified Slot and generating a strict booking binding.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slotId:
 *                 type: string
 *               issueDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Slot locked effectively generating mapping constraints
 */
router.post('/appointments', patientController.bookAppointment);

/**
 * @swagger
 * /api/patient/appointments/{id}:
 *   get:
 *     summary: Fetch exhaustive detail about an individual mapping
 *     tags: [Patient]
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
 *         description: Specific record extraction
 */
router.get('/appointments/:id', patientController.getAppointmentDetail);

/**
 * @swagger
 * /api/patient/appointments/{id}/cancel:
 *   patch:
 *     summary: Relinquishes locking mechanisms returning the target bounds back to available
 *     tags: [Patient]
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
 *         description: Slot boundary erased and explicitly freed
 */
router.patch('/appointments/:id/cancel', patientController.cancelAppointment);

/**
 * @swagger
 * /api/patient/prescriptions:
 *   get:
 *     summary: Obtain complete array mapping specific clinical instructions assigned
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Executable block
 */
router.get('/prescriptions', patientController.getPatientPrescriptions);

/**
 * @swagger
 * /api/patient/prescriptions/{id}:
 *   get:
 *     summary: Drill down into precise instructions designated on specific visit
 *     tags: [Patient]
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
 *         description: Granular string maps
 */
router.get('/prescriptions/:id', patientController.getPatientPrescriptionDetail);

/**
 * @swagger
 * /api/patient/medical-history:
 *   get:
 *     summary: Extracts all concluded clinical bounds connecting appointments and scripts sequentially
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sequential clinical history array
 */
router.get('/medical-history', patientController.getPatientMedicalHistory);

module.exports = router;

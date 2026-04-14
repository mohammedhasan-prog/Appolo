const express = require('express');
const shiftController = require('../../controllers/admin-shift.controller');
const slotController = require('../../controllers/admin-slot.controller');
const validate = require('../../middlewares/validate.middleware');
const { createShiftSchema } = require('../../validators/admin.validator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin-Shifts
 *   description: Shift and slot scheduling APIs
 */

/**
 * @swagger
 * /api/admin/shifts:
 *   get:
 *     summary: Get all shifts and slots
 *     tags: [Admin-Shifts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of scheduled shifts
 *   post:
 *     summary: Generate a new shift and slots
 *     tags: [Admin-Shifts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [doctorId, date, shiftType, startTime, endTime, consultationMode]
 *             properties:
 *               doctorId:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: "2026-05-10"
 *               shiftType:
 *                 type: string
 *                 enum: [MORNING, EVENING, NIGHT]
 *               startTime:
 *                 type: string
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 example: "12:00"
 *               consultationMode:
 *                 type: string
 *                 enum: [ONLINE, OFFLINE]
 *               intervalMins:
 *                 type: number
 *                 default: 15
 *     responses:
 *       201:
 *         description: Shift and internal slots successfully generated
 */
router.post('/', validate(createShiftSchema), shiftController.createShift);
router.get('/', shiftController.getShifts);
router.get('/:id', shiftController.getShiftById);
router.patch('/:id', shiftController.updateShift);
router.delete('/:id', shiftController.deleteShift);
router.patch('/:id/assign-doctor', shiftController.assignDoctorToShift);

// Slot operations linked to a shift
router.post('/:shiftId/slots/generate', slotController.generateSlots);
router.get('/:shiftId/slots', slotController.getSlotsForShift);

module.exports = router;

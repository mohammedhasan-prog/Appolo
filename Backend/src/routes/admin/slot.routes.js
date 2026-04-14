const express = require('express');
const slotController = require('../../controllers/admin-slot.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin-Slots
 *   description: Slot operational modification APIs
 */

/**
 * @swagger
 * /api/admin/slots/{id}/status:
 *   patch:
 *     summary: Manually update slot status
 *     tags: [Admin-Slots]
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
 *                 enum: [AVAILABLE, LOCKED, BOOKED, CANCELLED, COMPLETED, NO_SHOW]
 *     responses:
 *       200:
 *         description: Slot updated
 */
router.patch('/:id/status', slotController.updateSlotStatus);

/**
 * @swagger
 * /api/admin/slots/{id}/release:
 *   post:
 *     summary: Manually release a locked/booked slot
 *     tags: [Admin-Slots]
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
 *         description: Slot released to AVAILABLE
 */
router.post('/:id/release', slotController.releaseSlot);

module.exports = router;

const express = require('express');
const specialityController = require('../../controllers/admin-speciality.controller');
const validate = require('../../middlewares/validate.middleware');
const { createSpecialitySchema, updateSpecialitySchema } = require('../../validators/admin.validator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin-Specialities
 *   description: Clinic speciality management APIs
 */

/**
 * @swagger
 * /api/admin/specialities:
 *   get:
 *     summary: Get all specialities
 *     tags: [Admin-Specialities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of specialities
 *   post:
 *     summary: Create a new speciality
 *     tags: [Admin-Specialities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *             example:
 *               name: "Cardiology"
 *               description: "Heart and cardiovascular system"
 *               isActive: true
 *     responses:
 *       201:
 *         description: Speciality created
 */
router.post('/', validate(createSpecialitySchema), specialityController.createSpeciality);
router.get('/', specialityController.getSpecialities);

/**
 * @swagger
 * /api/admin/specialities/{id}:
 *   get:
 *     summary: Get a speciality by ID
 *     tags: [Admin-Specialities]
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
 *         description: Speciality data
 *   patch:
 *     summary: Update a speciality
 *     tags: [Admin-Specialities]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *             example:
 *               isActive: false
 *     responses:
 *       200:
 *         description: Speciality updated
 *   delete:
 *     summary: Soft delete a speciality
 *     tags: [Admin-Specialities]
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
 *         description: Speciality deleted
 */
router.get('/:id', specialityController.getSpeciality);
router.patch('/:id', validate(updateSpecialitySchema), specialityController.updateSpeciality);
router.delete('/:id', specialityController.deleteSpeciality);

module.exports = router;

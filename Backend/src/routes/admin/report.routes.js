const express = require('express');
const reportsController = require('../../controllers/admin-reports.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin-Reports
 *   description: Global metrics, reports and auditing APIs
 */

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get top level system metrics
 *     tags: [Admin-Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Global analytics metrics
 */
router.get('/dashboard', reportsController.getDashboard);

/**
 * @swagger
 * /api/admin/reports/appointments:
 *   get:
 *     summary: Retrieve history of all appointments
 *     tags: [Admin-Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of appointments
 */
router.get('/reports/appointments', reportsController.getAppointmentsReport);

/**
 * @swagger
 * /api/admin/reports/revenue:
 *   get:
 *     summary: Retrieve revenue and completed payments
 *     tags: [Admin-Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Gross revenue details
 */
router.get('/reports/revenue', reportsController.getRevenueReport);

/**
 * @swagger
 * /api/admin/reports/cancellations:
 *   get:
 *     summary: Retrieve cancellation logs and records
 *     tags: [Admin-Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cancellation audit details
 */
router.get('/reports/cancellations', reportsController.getCancellationsReport);

/**
 * @swagger
 * /api/admin/reports/patients:
 *   get:
 *     summary: Query registry of patients
 *     tags: [Admin-Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of patients and basic profiling
 */
router.get('/reports/patients', reportsController.getPatientsReport);

/**
 * @swagger
 * /api/admin/audit-logs:
 *   get:
 *     summary: Get master audit trail logs
 *     tags: [Admin-Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of audit records
 */
router.get('/audit-logs', reportsController.getAuditLogs);

module.exports = router;

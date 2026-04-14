const express = require('express');
const { protect, authorize } = require('../../middlewares/auth.middleware');
const specialityRoutes = require('./speciality.routes');
const doctorRoutes = require('./doctor.routes');
const shiftRoutes = require('./shift.routes');
const slotRoutes = require('./slot.routes');
const reportRoutes = require('./report.routes');
const patientRoutes = require('./patient.routes');

const router = express.Router();

// Require valid JWT and ADMIN role for everything under /api/admin
router.use(protect);
router.use(authorize('ADMIN'));

// Mount speciality routes
router.use('/specialities', specialityRoutes);
router.use('/doctors', doctorRoutes);
router.use('/shifts', shiftRoutes);
router.use('/slots', slotRoutes);
router.use('/patients', patientRoutes);
router.use('/', reportRoutes);

module.exports = router;

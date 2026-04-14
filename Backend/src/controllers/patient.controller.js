const patientService = require('../services/patient.service');

const getDashboard = async (req, res, next) => {
  try {
    const data = await patientService.getDashboardMetrics(req.user.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
};

const getUpcomingAppointments = async (req, res, next) => {
  try {
    const data = await patientService.getAppointments(req.user.id, 'upcoming');
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
};

const getPastAppointments = async (req, res, next) => {
  try {
    const data = await patientService.getAppointments(req.user.id, 'past');
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
};

const getDoctors = async (req, res, next) => {
  try {
    const data = await patientService.getDoctors(req.query);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
};

const getDoctorDetail = async (req, res, next) => {
  try {
    const data = await patientService.getDoctorDetail(req.params.id);
    if(!data) return res.status(404).json({ status: 'error', message: 'Doctor not found'});
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(404).json({ status: 'error', message: error.message }); }
};

const getDoctorAvailability = async (req, res, next) => {
  try {
    const data = await patientService.getDoctorAvailability(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(404).json({ status: 'error', message: error.message }); }
};

const getShifts = async (req, res, next) => {
  try {
    const data = await patientService.getShifts();
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
};

const getShiftSlots = async (req, res, next) => {
  try {
    const data = await patientService.getShiftSlots(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(404).json({ status: 'error', message: error.message }); }
};

const bookAppointment = async (req, res, next) => {
  try {
    const data = await patientService.bookAppointment(req.user.id, req.body);
    res.status(201).json({ status: 'success', data });
  } catch (error) { res.status(400).json({ status: 'error', message: error.message }); }
};

const getAppointmentDetail = async (req, res, next) => {
  try {
    const data = await patientService.getAppointmentDetail(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(403).json({ status: 'error', message: error.message }); }
};

const cancelAppointment = async (req, res, next) => {
  try {
    const data = await patientService.cancelAppointment(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(400).json({ status: 'error', message: error.message }); }
};


const getPatientPrescriptions = async (req, res, next) => {
  try {
    const data = await patientService.getPatientPrescriptions(req.user.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
};

const getPatientPrescriptionDetail = async (req, res, next) => {
  try {
    const data = await patientService.getPatientPrescriptionDetail(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(404).json({ status: 'error', message: error.message }); }
};

const getPatientMedicalHistory = async (req, res, next) => {
  try {
    const data = await patientService.getPatientMedicalHistory(req.user.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
};

module.exports = {
  getDashboard,
  getUpcomingAppointments,
  getPastAppointments,
  getDoctors,
  getDoctorDetail,
  getDoctorAvailability,
  getShifts,
  getShiftSlots,
  bookAppointment,
  getAppointmentDetail,
  cancelAppointment,
  getPatientPrescriptions,
  getPatientPrescriptionDetail,
  getPatientMedicalHistory
};

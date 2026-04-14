const doctorService = require('../services/doctor.service');

const getDashboard = async (req, res, next) => {
  try {
    const data = await doctorService.getDashboardMetrics(req.user.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getSchedule = async (req, res, next) => {
  try {
    const data = await doctorService.getDoctorSchedule(req.user.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getShiftSlots = async (req, res, next) => {
  try {
    const data = await doctorService.getShiftSlots(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(403).json({ status: 'error', message: error.message });
  }
};

const getDoctorAppointments = async (req, res, next) => {
  try {
    const data = await doctorService.getDoctorAppointments(req.user.id, req.query);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(500).json({ status: 'error', message: error.message }); }
};

const getAppointmentDetail = async (req, res, next) => {
  try {
    const data = await doctorService.getAppointmentDetail(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(403).json({ status: 'error', message: error.message }); }
};

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const data = await doctorService.updateAppointmentStatus(req.user.id, req.params.id, req.body.status);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(400).json({ status: 'error', message: error.message }); }
};

const updateAppointmentVideoLink = async (req, res, next) => {
  try {
    const data = await doctorService.updateAppointmentVideoLink(req.user.id, req.params.id, req.body.consultationLink);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(400).json({ status: 'error', message: error.message }); }
};

const getPatientHistoryForAppointment = async (req, res, next) => {
  try {
    const data = await doctorService.getPatientHistoryForAppointment(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(403).json({ status: 'error', message: error.message }); }
};

module.exports = {
  getDashboard,
  getSchedule,
  getShiftSlots,
  getDoctorAppointments,
  getAppointmentDetail,
  updateAppointmentStatus,
  updateAppointmentVideoLink,
  getPatientHistoryForAppointment
};

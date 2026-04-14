const patientService = require('../services/admin-patient.service');

const getAllPatients = async (req, res, next) => {
  try {
    const data = await patientService.getAllPatients(req.query);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const data = await patientService.getPatientById(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

const getPatientAppointments = async (req, res, next) => {
  try {
    const data = await patientService.getPatientAppointments(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getPatientPrescriptions = async (req, res, next) => {
  try {
    const data = await patientService.getPatientPrescriptions(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  getPatientAppointments,
  getPatientPrescriptions
};

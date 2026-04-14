const doctorService = require('../services/admin-doctor.service');

const createDoctor = async (req, res, next) => {
  try {
    const data = await doctorService.createDoctor(req.body);
    res.status(201).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const data = await doctorService.getAllDoctors(req.query);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getDoctorById = async (req, res, next) => {
  try {
    const data = await doctorService.getDoctorById(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

const updateDoctorProfile = async (req, res, next) => {
  try {
    const data = await doctorService.updateDoctorProfileFull(req.params.id, req.body);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateDoctorStatus = async (req, res, next) => {
  try {
    const data = await doctorService.updateDoctorStatus(req.params.id, req.body.isActive);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateDoctorMode = async (req, res, next) => {
  try {
    const data = await doctorService.updateDoctorMode(req.params.id, req.body.consultationMode);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateDoctorFee = async (req, res, next) => {
  try {
    const data = await doctorService.updateDoctorFee(req.params.id, req.body.consultationFee);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorProfile,
  updateDoctorStatus,
  updateDoctorMode,
  updateDoctorFee
};

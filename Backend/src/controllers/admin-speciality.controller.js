const specialityService = require('../services/speciality.service');

const createSpeciality = async (req, res, next) => {
  try {
    const data = await specialityService.createSpeciality(req.body);
    res.status(201).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getSpecialities = async (req, res, next) => {
  try {
    const data = await specialityService.getAllSpecialities();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getSpeciality = async (req, res, next) => {
  try {
    const data = await specialityService.getSpecialityById(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

const updateSpeciality = async (req, res, next) => {
  try {
    const data = await specialityService.updateSpeciality(req.params.id, req.body);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const deleteSpeciality = async (req, res, next) => {
  try {
    await specialityService.deleteSpeciality(req.params.id);
    res.status(200).json({ status: 'success', message: 'Speciality marked as inactive/deleted' });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createSpeciality,
  getSpecialities,
  getSpeciality,
  updateSpeciality,
  deleteSpeciality
};

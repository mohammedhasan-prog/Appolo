const shiftService = require('../services/admin-shift.service');

const createShift = async (req, res, next) => {
  try {
    const data = await shiftService.createShift(req.body);
    res.status(201).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getShifts = async (req, res, next) => {
  try {
    const data = await shiftService.getAllShifts(req.query);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getShiftById = async (req, res, next) => {
  try {
    const data = await shiftService.getShiftById(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(404).json({ status: 'error', message: error.message }); }
};

const updateShift = async (req, res, next) => {
  try {
    const data = await shiftService.updateShift(req.params.id, req.body);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(400).json({ status: 'error', message: error.message }); }
};

const deleteShift = async (req, res, next) => {
  try {
    await shiftService.deleteShift(req.params.id);
    res.status(200).json({ status: 'success', message: 'Deleted Shift' });
  } catch (error) { res.status(404).json({ status: 'error', message: error.message }); }
};

const assignDoctorToShift = async (req, res, next) => {
  try {
    const data = await shiftService.assignDoctorToShift(req.params.id, req.body.doctorId);
    res.status(200).json({ status: 'success', data });
  } catch (error) { res.status(400).json({ status: 'error', message: error.message }); }
};

module.exports = {
  createShift,
  getShifts,
  getShiftById,
  updateShift,
  deleteShift,
  assignDoctorToShift
};

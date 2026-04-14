const slotService = require('../services/admin-slot.service');

const generateSlots = async (req, res, next) => {
  try {
    const data = await slotService.generateSlots(req.params.shiftId, req.body);
    res.status(201).json({ status: 'success', message: 'Slots generated', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const getSlotsForShift = async (req, res, next) => {
  try {
    const data = await slotService.getSlotsForShift(req.params.shiftId);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateSlotStatus = async (req, res, next) => {
    try {
        const data = await slotService.updateSlotStatus(req.params.id, req.body.status);
        res.status(200).json({ status: 'success', data });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const releaseSlot = async (req, res, next) => {
    try {
        const data = await slotService.releaseSlot(req.params.id);
        res.status(200).json({ status: 'success', data });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    generateSlots,
    getSlotsForShift,
    updateSlotStatus,
    releaseSlot
};

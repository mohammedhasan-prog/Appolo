const prisma = require('../utils/prismaClient');

// Generating timings without tying exactly to initial shift creation
const generateSlotTimings = (startTime, endTime, intervalMins = 15) => {
  const slots = [];
  const parseMins = (timeStr) => {
    const [h, m] = timeStr.split(':');
    return parseInt(h) * 60 + parseInt(m);
  };
  
  const formatTime = (totalMins) => {
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  let currentMins = parseMins(startTime);
  let endMins = parseMins(endTime);
  let token = 1;

  while (currentMins + intervalMins <= endMins) {
    const sTime = formatTime(currentMins);
    const eTime = formatTime(currentMins + intervalMins);
    slots.push({
      startTime: sTime,
      endTime: eTime,
      tokenNumber: token
    });
    currentMins += intervalMins;
    token++;
  }
  return slots;
};

const generateSlots = async (shiftId, data) => {
  const { startTime, endTime, slotDuration = 15 } = data;
  
  const shift = await prisma.shift.findUnique({ where: { id: shiftId } });
  if (!shift) throw new Error('Shift not found');

  const slotData = generateSlotTimings(startTime, endTime, slotDuration);

  // Map to prisma creation structure
  const slotsToCreate = slotData.map(s => ({
    ...s,
    shiftId
  }));

  return await prisma.slot.createMany({
    data: slotsToCreate
  });
};

const getSlotsForShift = async (shiftId) => {
  return await prisma.slot.findMany({
    where: { shiftId },
    orderBy: { tokenNumber: 'asc' }
  });
};

const updateSlotStatus = async (slotId, status) => {
    return await prisma.slot.update({
        where: { id: slotId },
        data: { status }
    });
};

const releaseSlot = async (slotId) => {
    // Check if slot logic maps it to AVAILABLE
    return await prisma.slot.update({
        where: { id: slotId },
        data: { status: 'AVAILABLE' }
    });
};

module.exports = {
  generateSlots,
  getSlotsForShift,
  updateSlotStatus,
  releaseSlot
};

const prisma = require('../utils/prismaClient');

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

const createShift = async (data) => {
  const { doctorId, date, shiftType, startTime, endTime, consultationMode, intervalMins = 15 } = data;

  const doctor = await prisma.user.findUnique({
    where: { id: doctorId, role: 'DOCTOR' },
    include: { doctorProfile: true }
  });

  if (!doctor) throw new Error('Doctor not found');
  if (doctor.doctorProfile?.consultationMode && doctor.doctorProfile.consultationMode !== consultationMode && doctor.doctorProfile.consultationMode !== 'BOTH') {
    // Basic verification, though SRS allows doctors to have specific mode. We can just store shift mode.
  }

  const slotData = generateSlotTimings(startTime, endTime, intervalMins);

  if (slotData.length === 0) {
    throw new Error('Shift duration is too short for any slots.');
  }

  return await prisma.shift.create({
    data: {
      doctorId,
      date: new Date(date), // assumes ISO string wrapper yyyy-mm-dd
      shiftType,
      startTime,
      endTime,
      consultationMode,
      slots: {
        create: slotData
      }
    },
    include: {
      slots: true
    }
  });
};

const getAllShifts = async (filters = {}) => {
  return await prisma.shift.findMany({
    where: filters,
    include: {
      doctor: {
        select: { name: true, email: true }
      },
      slots: true
    }
  });
};

const getShiftById = async (id) => {
  const shift = await prisma.shift.findUnique({
    where: { id },
    include: { slots: true, doctor: { select: { name: true } } }
  });
  if (!shift) throw new Error('Shift not found');
  return shift;
};

const updateShift = async (id, data) => {
  return await prisma.shift.update({
    where: { id },
    data
  });
};

const deleteShift = async (id) => {
  await prisma.slot.deleteMany({ where: { shiftId: id }});
  return await prisma.shift.delete({ where: { id }});
};

const assignDoctorToShift = async (id, doctorId) => {
  return await prisma.shift.update({
    where: { id },
    data: { doctorId },
    include: { doctor: { select: { name: true } } }
  });
};

module.exports = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
  assignDoctorToShift
};

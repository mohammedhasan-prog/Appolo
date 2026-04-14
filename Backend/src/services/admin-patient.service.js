const prisma = require('../utils/prismaClient');

const getAllPatients = async (filters = {}) => {
  return await prisma.user.findMany({
    where: { role: 'PATIENT', ...filters },
    include: { patientProfile: true },
    orderBy: { createdAt: 'desc' }
  });
};

const getPatientById = async (id) => {
  const patient = await prisma.user.findUnique({
    where: { id, role: 'PATIENT' },
    include: { patientProfile: true }
  });
  if (!patient) throw new Error('Patient not found');
  return patient;
};

const getPatientAppointments = async (patientId) => {
  return await prisma.appointment.findMany({
    where: { patientId },
    include: { doctor: { select: { name: true, email: true } }, slot: true },
    orderBy: { bookedAt: 'desc' }
  });
};

const getPatientPrescriptions = async (patientId) => {
  return await prisma.prescription.findMany({
    where: { appointment: { patientId } },
    include: { doctor: { select: { name: true } }, appointment: true },
    orderBy: { createdAt: 'desc' }
  });
};

module.exports = {
  getAllPatients,
  getPatientById,
  getPatientAppointments,
  getPatientPrescriptions
};

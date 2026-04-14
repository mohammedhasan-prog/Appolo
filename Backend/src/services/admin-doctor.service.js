const prisma = require('../utils/prismaClient');
const bcrypt = require('bcryptjs');

const createDoctor = async (data) => {
  const { name, email, password, phone, specialityId, consultationMode, consultationFee, clinicAddress, bio } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'DOCTOR',
      phone,
      doctorProfile: {
        create: {
          specialityId,
          consultationMode, // ONLINE, OFFLINE
          consultationFee,
          clinicAddress,
          bio
        }
      }
    },
    include: {
      doctorProfile: true
    }
  });
};

const getAllDoctors = async (filters = {}) => {
  return await prisma.user.findMany({
    where: {
      role: 'DOCTOR',
      ...filters
    },
    include: {
      doctorProfile: {
        include: {
          speciality: true
        }
      }
    }
  });
};

const getDoctorById = async (id) => {
  const doctor = await prisma.user.findUnique({
    where: { id, role: 'DOCTOR' },
    include: {
      doctorProfile: {
        include: {
          speciality: true
        }
      }
    }
  });
  if (!doctor) throw new Error('Doctor not found');
  return doctor;
};

const updateDoctorStatus = async (id, isActive) => {
  const doctor = await prisma.doctorProfile.findUnique({ where: { userId: id } });
  if (!doctor) throw new Error('Doctor profile not found');

  return await prisma.doctorProfile.update({
    where: { userId: id },
    data: { isActive },
    include: { user: true }
  });
};

const updateDoctorMode = async (id, consultationMode) => {
  const doctor = await prisma.doctorProfile.findUnique({ where: { userId: id } });
  if (!doctor) throw new Error('Doctor profile not found');

  return await prisma.doctorProfile.update({
    where: { userId: id },
    data: { consultationMode }
  });
};

const updateDoctorFee = async (id, consultationFee) => {
  const doctor = await prisma.doctorProfile.findUnique({ where: { userId: id } });
  if (!doctor) throw new Error('Doctor profile not found');

  return await prisma.doctorProfile.update({
    where: { userId: id },
    data: { consultationFee }
  });
};

const updateDoctorProfileFull = async (id, data) => {
  const doctor = await prisma.doctorProfile.findUnique({ where: { userId: id } });
  if (!doctor) throw new Error('Doctor profile not found');

  return await prisma.doctorProfile.update({
    where: { userId: id },
    data
  });
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorStatus,
  updateDoctorMode,
  updateDoctorFee,
  updateDoctorProfileFull
};

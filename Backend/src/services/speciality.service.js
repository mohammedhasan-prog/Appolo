const prisma = require('../utils/prismaClient');

const createSpeciality = async (data) => {
  return await prisma.speciality.create({
    data: {
      name: data.name,
      description: data.description,
      isActive: data.isActive
    }
  });
};

const getAllSpecialities = async () => {
  return await prisma.speciality.findMany({
    orderBy: { name: 'asc' }
  });
};

const getSpecialityById = async (id) => {
  const speciality = await prisma.speciality.findUnique({
    where: { id },
  });
  if (!speciality) throw new Error('Speciality not found');
  return speciality;
};

const updateSpeciality = async (id, data) => {
  // Check existence
  await getSpecialityById(id);
  
  return await prisma.speciality.update({
    where: { id },
    data
  });
};

const deleteSpeciality = async (id) => {
  // Rather than hard delete, soft delete or check for existing doctors?
  // SRS says "Delete or soft delete speciality"
  await getSpecialityById(id);
  
  // Let's do a soft delete to be safe
  return await prisma.speciality.update({
    where: { id },
    data: { isActive: false }
  });
};

module.exports = {
  createSpeciality,
  getAllSpecialities,
  getSpecialityById,
  updateSpeciality,
  deleteSpeciality
};

const prisma = require('../utils/prismaClient');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

const registerUser = async (data) => {
  const { name, email, password, role, phone } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Prepare user data
  const userData = {
    name,
    email,
    password: hashedPassword,
    role,
    phone,
  };

  // Add specific profile based on role
  if (role === 'DOCTOR') {
    userData.doctorProfile = {
      create: {}
    };
  } else if (role === 'PATIENT') {
    userData.patientProfile = {
      create: {}
    };
  }

  // Create user
  const user = await prisma.user.create({
    data: userData,
  });

  const token = generateToken(user.id, user.role);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token
  };
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (user.status !== 'ACTIVE') {
    throw new Error('User account is deactivated');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id, user.role);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token
  };
};

module.exports = {
  registerUser,
  loginUser,
};

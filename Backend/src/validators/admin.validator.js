const { z } = require('zod');

const createSpecialitySchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  })
});

const updateSpecialitySchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  })
});

const createDoctorSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name required'),
    email: z.string().email('Valid email required'),
    password: z.string().min(6, 'Min 6 char password required'),
    phone: z.string().optional(),
    specialityId: z.string().optional(),
    consultationMode: z.enum(['ONLINE', 'OFFLINE']).optional(),
    consultationFee: z.number().nonnegative().optional(),
    clinicAddress: z.string().optional(),
    bio: z.string().optional()
  })
});

const updateDoctorStatusSchema = z.object({ body: z.object({ isActive: z.boolean() }) });
const updateDoctorModeSchema = z.object({ body: z.object({ consultationMode: z.enum(['ONLINE', 'OFFLINE']) }) });
const updateDoctorFeeSchema = z.object({ body: z.object({ consultationFee: z.number().nonnegative() }) });

const createShiftSchema = z.object({
  body: z.object({
    doctorId: z.string().uuid('Valid Doctor ID is required'),
    date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date string" }),
    shiftType: z.enum(['MORNING', 'EVENING', 'NIGHT']),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'HH:MM'),
    endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'HH:MM'),
    consultationMode: z.enum(['ONLINE', 'OFFLINE']),
    intervalMins: z.number().positive().default(15)
  })
});

module.exports = {
  createSpecialitySchema,
  updateSpecialitySchema,
  createDoctorSchema,
  updateDoctorStatusSchema,
  updateDoctorModeSchema,
  updateDoctorFeeSchema,
  createShiftSchema
};

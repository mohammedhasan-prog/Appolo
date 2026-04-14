const prisma = require('../utils/prismaClient');

const getDashboardMetrics = async (doctorId) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const upcomingAppointments = await prisma.appointment.count({
        where: { doctorId, status: { in: ['PENDING', 'CONFIRMED'] } }
    });

    const completedAppointments = await prisma.appointment.count({
        where: { doctorId, status: 'COMPLETED' }
    });

    const todaysShifts = await prisma.shift.findMany({
        where: { doctorId, date: { gte: todayStart, lte: todayEnd } },
        include: { 
            slots: {
                include: { appointments: true }
            } 
        }
    });

    const payments = await prisma.payment.findMany({
        where: { doctorId, paymentStatus: 'COMPLETED' }
    });
    
    const totalRevenue = payments.reduce((acc, current) => acc + current.amount, 0);

    return {
        upcomingAppointments,
        completedAppointments,
        todaySchedule: todaysShifts,
        totalRevenue
    };
};

const getDoctorSchedule = async (doctorId) => {
    return await prisma.shift.findMany({
        where: { doctorId },
        orderBy: { date: 'asc' },
        include: { 
            slots: {
                where: { status: 'AVAILABLE' }
            } 
        }
    });
};

const getShiftSlots = async (doctorId, shiftId) => {
    const shift = await prisma.shift.findUnique({
        where: { id: shiftId }
    });
    
    if (!shift || shift.doctorId !== doctorId) {
        throw new Error('Shift not found or unauthorized access.');
    }

    return await prisma.slot.findMany({
        where: { shiftId },
        orderBy: { tokenNumber: 'asc' },
        include: {
            appointments: {
                include: { patient: { select: { name: true } } }
            }
        }
    });
};

const getDoctorAppointments = async (doctorId, filters = {}) => {
    return await prisma.appointment.findMany({
        where: { doctorId, ...filters },
        include: { patient: { select: { name: true, email: true } }, slot: true },
        orderBy: { bookedAt: 'desc' }
    });
};

const getAppointmentDetail = async (doctorId, appointmentId) => {
    const appointment = await prisma.appointment.findFirst({
        where: { id: appointmentId, doctorId },
        include: { 
            patient: { include: { patientProfile: true } },
            slot: true,
            prescription: true,
            payment: true
        }
    });
    if (!appointment) throw new Error('Appointment not found or unauthorized view.');
    return appointment;
};

const updateAppointmentStatus = async (doctorId, appointmentId, status) => {
    const validStatuses = ['CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];
    if (!validStatuses.includes(status)) throw new Error('Invalid status map');

    const appointment = await prisma.appointment.findFirst({
        where: { id: appointmentId, doctorId }
    });
    
    if (!appointment) throw new Error('Appointment not found');

    return await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status }
    });
};

const updateAppointmentVideoLink = async (doctorId, appointmentId, consultationLink) => {
    const appointment = await prisma.appointment.findFirst({
        where: { id: appointmentId, doctorId }
    });
    
    if (!appointment) throw new Error('Appointment not found');

    return await prisma.appointment.update({
        where: { id: appointmentId },
        data: { consultationLink }
    });
};

const getPatientHistoryForAppointment = async (doctorId, appointmentId) => {
    // Verifies the appointment boundary exists for this doctor first
    const appointment = await prisma.appointment.findFirst({
        where: { id: appointmentId, doctorId }
    });
    
    if (!appointment) throw new Error('Appointment not found or unauthorized access to history.');

    const patientHistory = await prisma.appointment.findMany({
        where: { patientId: appointment.patientId },
        include: { doctor: { select: { name: true } }, prescription: true },
        orderBy: { bookedAt: 'desc' }
    });

    return patientHistory;
};

module.exports = {
  getDashboardMetrics,
  getDoctorSchedule,
  getShiftSlots,
  getDoctorAppointments,
  getAppointmentDetail,
  updateAppointmentStatus,
  updateAppointmentVideoLink,
  getPatientHistoryForAppointment
};

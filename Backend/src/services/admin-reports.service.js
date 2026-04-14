const prisma = require('../utils/prismaClient');

const getDashboardMetrics = async () => {
    const totalDoctors = await prisma.user.count({ where: { role: 'DOCTOR' } });
    const totalPatients = await prisma.user.count({ where: { role: 'PATIENT' } });
    const totalAppointments = await prisma.appointment.count();
    
    return {
        totalDoctors,
        totalPatients,
        totalAppointments
    };
};

const getAppointmentsReport = async (filters = {}) => {
    return await prisma.appointment.findMany({
        where: filters,
        include: {
            doctor: { select: { name: true } },
            patient: { select: { name: true } },
            slot: true
        },
        orderBy: { bookedAt: 'desc' }
    });
};

const getRevenueReport = async () => {
    const payments = await prisma.payment.findMany({
        where: { paymentStatus: 'COMPLETED' }
    });
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    return { totalRevenue, details: payments };
};

const getCancellationsReport = async () => {
    return await prisma.appointment.findMany({
        where: { status: 'CANCELLED' },
        include: {
            doctor: { select: { name: true } },
            patient: { select: { name: true } }
        },
        orderBy: { cancelledAt: 'desc' }
    });
};

const getPatientsReport = async (filters = {}) => {
    return await prisma.user.findMany({
        where: { role: 'PATIENT', ...filters },
        include: { patientProfile: true },
        orderBy: { createdAt: 'desc' }
    });
};

const getAuditLogs = async () => {
    return await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100
    });
};

module.exports = {
    getDashboardMetrics,
    getAppointmentsReport,
    getRevenueReport,
    getCancellationsReport,
    getPatientsReport,
    getAuditLogs
};

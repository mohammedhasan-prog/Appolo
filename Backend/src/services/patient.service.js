const prisma = require('../utils/prismaClient');

const getDashboardMetrics = async (patientId) => {
    const upcoming = await prisma.appointment.findMany({
        where: { patientId, status: { in: ['PENDING', 'CONFIRMED'] } },
        include: { slot: true, doctor: { select: { name: true } } }
    });

    const past = await prisma.appointment.findMany({
        where: { patientId, status: { in: ['COMPLETED', 'CANCELLED', 'NO_SHOW'] } },
        include: { slot: true, doctor: { select: { name: true } } }
    });

    const prescriptions = await prisma.prescription.findMany({
        where: { appointment: { patientId } },
        include: { appointment: { include: { doctor: { select: { name: true } } } } }
    });

    return { upcoming, past, prescriptions };
};

const getAppointments = async (patientId, type) => {
    const statusFilter = type === 'upcoming' ? ['PENDING', 'CONFIRMED'] : ['COMPLETED', 'CANCELLED', 'NO_SHOW'];
    return await prisma.appointment.findMany({
        where: { patientId, status: { in: statusFilter } },
        include: { slot: { include: { shift: true } }, doctor: { select: { name: true, email: true } }, prescription: true },
        orderBy: { bookedAt: 'desc' }
    });
};

const getDoctors = async (filters = {}) => {
    return await prisma.user.findMany({
        where: { role: 'DOCTOR' },
        include: { doctorProfile: { include: { speciality: true } } }
    });
};

const getDoctorDetail = async (doctorId) => {
    return await prisma.user.findUnique({
        where: { id: doctorId, role: 'DOCTOR' },
        include: { doctorProfile: { include: { speciality: true } } }
    });
};

const getDoctorAvailability = async (doctorId) => {
    return await prisma.shift.findMany({
        where: { doctorId },
        include: { slots: { where: { status: 'AVAILABLE'} } }
    });
};

const getShifts = async () => {
    return await prisma.shift.findMany({
        include: { 
            slots: { where: { status: 'AVAILABLE'} }, 
            doctor: { select: { name: true, doctorProfile: { select: { consultationFee: true, consultationMode: true } } } } 
        }
    });
};

const getShiftSlots = async (shiftId) => {
    return await prisma.slot.findMany({
        where: { shiftId, status: 'AVAILABLE' },
        orderBy: { tokenNumber: 'asc' }
    });
};

const bookAppointment = async (patientId, data) => {
    const { slotId, issueDescription = 'General checkup' } = data;
    
    // Transaction enforcing atomic locking ensuring NO double bookings
    return await prisma.$transaction(async (tx) => {
        const slot = await tx.slot.findUnique({ where: { id: slotId }, include: { shift: true } });
        if (!slot) throw new Error('Slot not found');
        if (slot.status !== 'AVAILABLE') throw new Error('Slot is currently unavailable or booked');

        // Lock slot atomically
        await tx.slot.update({
            where: { id: slotId },
            data: { status: 'BOOKED' }
        });

        // Create booking
        return await tx.appointment.create({
            data: {
                patientId,
                doctorId: slot.shift.doctorId,
                shiftId: slot.shiftId,
                slotId,
                status: 'CONFIRMED',
                mode: slot.shift.consultationMode,
                tokenNumber: slot.tokenNumber
            }
        });
    });
};

const getAppointmentDetail = async (patientId, appointmentId) => {
    const apt = await prisma.appointment.findFirst({
        where: { id: appointmentId, patientId },
        include: { doctor: { select: { name: true } }, slot: true, prescription: true }
    });
    if (!apt) throw new Error('Appointment not found');
    return apt;
};

const cancelAppointment = async (patientId, appointmentId) => {
    return await prisma.$transaction(async (tx) => {
        const apt = await tx.appointment.findFirst({
            where: { id: appointmentId, patientId },
            include: { slot: true }
        });
        if (!apt) throw new Error('Appointment not found');
        if (['COMPLETED', 'CANCELLED'].includes(apt.status)) {
            throw new Error('Appointment cannot be cancelled anymore');
        }

        const updated = await tx.appointment.update({
            where: { id: appointmentId },
            data: { status: 'CANCELLED' }
        });

        // Release slot back to public
        await tx.slot.update({
            where: { id: apt.slotId },
            data: { status: 'AVAILABLE' }
        });

        return updated;
    });
};

const getPatientPrescriptions = async (patientId) => {
    return await prisma.prescription.findMany({
        where: { appointment: { patientId } },
        include: { doctor: { select: { name: true } }, appointment: { select: { bookedAt: true } } },
        orderBy: { createdAt: 'desc' }
    });
};

const getPatientPrescriptionDetail = async (patientId, prescriptionId) => {
    const p = await prisma.prescription.findFirst({
        where: { id: prescriptionId, appointment: { patientId } },
        include: { doctor: { select: { name: true } }, appointment: true }
    });
    if (!p) throw new Error('Prescription not found');
    return p;
};

const getPatientMedicalHistory = async (patientId) => {
    const history = await prisma.appointment.findMany({
        where: { patientId, status: { in: ['COMPLETED'] } }, // Typical history implies finished interactions
        include: { doctor: { select: { name: true } }, prescription: true, slot: true },
        orderBy: { bookedAt: 'desc' }
    });
    return history;
};

module.exports = {
    getDashboardMetrics,
    getAppointments,
    getDoctors,
    getDoctorDetail,
    getDoctorAvailability,
    getShifts,
    getShiftSlots,
    bookAppointment,
    getAppointmentDetail,
    cancelAppointment,
    getPatientPrescriptions,
    getPatientPrescriptionDetail,
    getPatientMedicalHistory
};

import { Request, Response } from "express";
import { AppointmentEntity } from "../entities/appointment_entity";
import { getRepository } from "typeorm";

// booking appointment and save in the DB
export const s_booking_appointments = async (req: Request, res: Response) => {
    const { patient_id, doctor_id, appointment_date, appointment_time, status } = req.body;

    try {
        const appointment = AppointmentEntity.create({
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status,
        })
        const newAppointment = await AppointmentEntity.save(appointment);
        if (!newAppointment) {
            return res.status(401).json({ message: 'تأكد من بيانات الحجز يا ورع' });
        }
        return newAppointment;
    } catch (error) {
        console.error('حدث خطأ أثناء تسجيل الدخول:', error);
        res.status(500).json({ error: "حدث خطأ أثناء حجز الموعد " });
    }




}

// get all appointments for specific doctor
export const s_get_appointments_specific_doctor = async (req: Request, res: Response) => {
    try {
        const doctorId = req.params.doctor_id;
        const status = "مؤكد";
        const appointmentRepository = getRepository(AppointmentEntity);
        const appointmentsForDoctor = await appointmentRepository.find({ where: { doctor_id: doctorId, status: status } });
        console.log(appointmentsForDoctor);
        return appointmentsForDoctor;
    } catch (error) {
        console.error('حدث خطأ أثناء استرجاع المواعيد:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء استرجاع المواعيد' });
    }
}

// Its status changes to completed
export const s_completed_appointment = async (req: Request, res: Response) => {
    const appointmentId = Number(req.params.appointment_id);
    const status = 'تم انجاز الموعد';

    try {
        const appointmentRepository = getRepository(AppointmentEntity);
        const completedAppointment = await appointmentRepository.findOne({ where: { id: appointmentId } })
        if (!completedAppointment) {
            return res.status(404).json({ error: 'موعد غير موجود' });
        }
        completedAppointment.status = status;
        await appointmentRepository.save(completedAppointment);
        return completedAppointment;
    } catch (error) {
        console.error('حدث خطأ أثناء انجاز الموعد:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء انجاز الموعد' });
    }
}

// delete appointment
export const s_delete_appointment = async (req: Request, res: Response) => {
    const appointmentId = Number(req.params.appointment_id);

    try {
        const appointmentRepository = getRepository(AppointmentEntity);
        const appointment = await appointmentRepository.findOne({ where: { id: appointmentId } })

        if (!appointment) {
            return res.status(404).json({ error: 'الموعد غير موجود' });
        }

        const deletedAppointment = await appointmentRepository.remove(appointment);

        return deletedAppointment;
    } catch (error) {
        console.error('حدث خطأ أثناء حذف الموعد:', error);
        return res.status(500).json({ error: 'حدث خطأ أثناء حذف الموعد' });
    }
}
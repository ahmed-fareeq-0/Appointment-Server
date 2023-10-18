import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { s_booking_appointments, s_completed_appointment, s_delete_appointment, s_get_appointments_specific_doctor } from "../services/appointment_service";

export const booking_appointment = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.json({
            error: true,
            errors: errors.array(),
            message: "تأكد من صحة البيانات"
        })

    } else {
        const result = await s_booking_appointments(req, res);
        return res.json({ message: 'تم حجز الموعد بنجاح', result });
    }

}

export const get_appointments_specific_doctor = async (req: Request, res: Response) => {
    const result = await s_get_appointments_specific_doctor(req, res);
    return res.status(200).json({ message: 'تم الحصول على موعد خاص لطبيب معين', result });
}

export const completed_appointment = async (req: Request, res: Response) => {
    const result = await s_completed_appointment(req, res);
    return res.status(200).json({ message: 'تم انجاز الموعد', result });
}

export const deleted_appointment = async (req: Request, res: Response) => {
    const result = await s_delete_appointment(req, res);
    return res.status(200).json({ message: 'تم حذف الموعد بنجاح', result });
}
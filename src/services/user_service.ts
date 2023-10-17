import { Request, Response } from "express";
import { DoctorEntity, PatientEntity } from "../entities/user_entity";
import { hashPassword } from "../helpers/user_helper";
import crypto from "crypto";
import { getRepository } from "typeorm";

export const s_user_register_patient = async (req: Request, res: Response) => {
    const { name, email, password, phone, user_type } = req.body;

    const hashedPassword = hashPassword(password);
    const newUser = PatientEntity.create({
        name,
        email,
        password: hashedPassword,
        phone,
        user_type,
    });

    const newPatientUser = await PatientEntity.save(newUser);
    return newPatientUser;
};

export const s_user_register_doctor = async (req: Request, res: Response) => {
    const { name, email, password, phone, specialty, office_location, office_location_latitude, office_location_longitude, user_type } = req.body;

    const hashedPassword = hashPassword(password);
    const newUser = DoctorEntity.create({
        name,
        email,
        password: hashedPassword,
        phone,
        specialty,
        office_location,
        office_location_latitude,
        office_location_longitude,
        user_type,
    });

    const newDoctorUser = await DoctorEntity.save(newUser);
    return newDoctorUser;
}

export const s_user_login_doctor_patient = async (req: Request, res: Response) => {
    const { email, password, user_type } = req.body;

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hashPassword(password);

    let user;
    try {

        if (user_type === "doctor") {
            user = await getRepository(DoctorEntity).findOne({ where: { email, password: hashedPassword } });
        } else if (user_type === "patient") {
            user = await getRepository(PatientEntity).findOne({ where: { email, password: hashedPassword } });
        }

    } catch (error) {
        console.error('حدث خطأ أثناء تسجيل الدخول:', error);
        res.status(500).json({ error: `حدث خطأ أثناء تسجيل الدخول ${user_type === "doctor" ? "الطبيب" : "المريض"}` });
    }

    return user;

}


import { Request, Response } from "express";
import { DoctorEntity, PatientEntity } from "../entities/user_entity";
import { hashPassword } from "../helpers/user_helper";
import crypto from "crypto";
import { generateToken } from '../utils/jwtUtils';
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

    if (!newPatientUser) {
        return res.status(401).json({ message: 'تأكد من معلومات تسجيل المريض' });
    }
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

    if (!newDoctorUser) {
        return res.status(401).json({ message: 'تأكد من معلومات تسجيل الطبيب' });
    }

    return newDoctorUser;
}

export const s_user_login = async (req: Request, res: Response) => {
    const { email, password, user_type } = req.body;
    const hashedPassword = hashPassword(password);

    try {
        let user;
        if (user_type === "doctor") {
            const userDoctorsRepository = getRepository(DoctorEntity);
            user = await userDoctorsRepository.findOne({ where: { email, password: hashedPassword } });
        } else if (user_type === "patient") {
            const userPatientRepository = getRepository(PatientEntity);
            user = await userPatientRepository.findOne({ where: { email, password: hashedPassword } });
        }

        if (!user) {
            return res.status(401).json({ message: 'تأكد من صحة البيانات يا ورع' });
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const token = generateToken({ email, user_type, salt });
        return { user, token }


    } catch (error) {
        console.error('حدث خطأ أثناء تسجيل الدخول:', error);
        res.status(500).json({ error: `حدث خطأ أثناء تسجيل الدخول ${user_type === "doctor" ? "الطبيب" : "المريض"}` });
    }

}




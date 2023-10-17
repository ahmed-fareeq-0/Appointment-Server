import { Request, Response } from "express"
import { User_entity } from "../entities/user_entity";

export const s_user_register_patient = async (req: Request, res: Response) => {
    const { name, email, password, phone, user_type } = req.body;

    const newPatientUser = await User_entity.save({
        name: name,
        email: email,
        password: password,
        phone: phone,
        user_type: user_type
    });

    return newPatientUser;

}
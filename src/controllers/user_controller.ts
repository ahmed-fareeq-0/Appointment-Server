import { Request, Response } from "express"
import { s_user_register_patient } from "../services/user_service"
import { validationResult } from "express-validator";

export const register_patient = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.json({
            error: true,
            errors: errors.array(),
            message: "تأكد من صحة البيانات"
        })

    } else {
        const result = await s_user_register_patient(req, res);
        res.json(result);
    }

}
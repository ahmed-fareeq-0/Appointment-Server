import { check } from "express-validator"

export const login_patient_validation = () => {
    return [
        check("email").isEmail().withMessage("البريد الاكتروني مطلوب"),
        check("password").isString().withMessage("كلمة المرور مطلوبة").isLength({ min: 8 }),
        check("user_type").isString().withMessage("مطلوب"),
    ];
}
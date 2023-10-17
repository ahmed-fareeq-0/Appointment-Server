import { check } from "express-validator";

export const register_Doctor_validation = () => {
    return [
        check("name").exists().withMessage("الإسم مطلوب").isLength({ min: 3, max: 60 }).withMessage("يجب أن يتراوح الاسم الأول بين 3 و60 حرفًا"),
        check("email").isEmail().withMessage("البريد الاكتروني مطلوب"),
        check("password").isString().withMessage("كلمة المرور مطلوبة").isLength({ min: 8 }).withMessage("يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
        check("phone").isString().withMessage("رقم الهاتف مطلوب"),
        check("specialty").exists().withMessage("التخصص مطلوب"),
        check("office_location").exists().withMessage("الموقع مطلوب"),
        check("office_location_latitude").isNumeric().withMessage("مطلوب خط عرض "),
        check("office_location_longitude").isNumeric().withMessage("مطلوب خط الطول "),
        check("user_type").exists().withMessage("User type is required"),
    ];
};

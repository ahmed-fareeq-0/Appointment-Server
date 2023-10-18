import { check } from 'express-validator'

export const appointment_validation = () => {
    return [
        check("patient_id").isNumeric(),
        check("doctor_id").isNumeric(),
        check("appointment_date").isString(),
        check("appointment_time").isString(),
        check("status").isString(),

    ]
}
import express from "express";
export const appointment_route = express.Router();

import { appointment_validation } from '../validations/appointment/appointment_validation';
import { booking_appointment, completed_appointment, deleted_appointment, get_appointments_specific_doctor } from "../controllers/appointment_controller";


appointment_route.post("/booking_appointments", appointment_validation(), booking_appointment);
appointment_route.get("/get_appointments_specific_doctor/:doctor_id", get_appointments_specific_doctor);
appointment_route.put("/completed_appointment/:appointment_id", completed_appointment);
appointment_route.delete("/deleted_appointment/:appointment_id", deleted_appointment);
import express from 'express';
import { login_patient, register_doctor, register_patient } from '../controllers/user_controller';
import { register_patient_validation } from '../validations/user/register_patient_validation';
import { register_Doctor_validation } from '../validations/user/register_doctor_validation';
import { login_patient_validation } from '../validations/user/login_doctor_validation';

export const user_route = express.Router();

user_route.post("/register_patients", register_patient_validation(), register_patient);
user_route.post("/register_doctors", register_Doctor_validation(), register_doctor);
user_route.post("/login", login_patient_validation(), login_patient);

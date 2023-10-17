import express from 'express';
import { register_patient } from '../controllers/user_controller';
import { register_patient_validation } from '../validations/user/register_patient_validation';
export const user_route = express.Router();

user_route.post("/register_patients", register_patient_validation(), register_patient)
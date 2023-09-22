const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post("/register_patients", userController.registerPatient);
// router.post("/login_patients", userController.loginPatient);
router.post("/register_doctors", userController.registerDoctor);
// router.post("/login_doctors", userController.loginDoctor);
router.post("/booking_Appointments", userController.bookingAppointments);
router.get("/doctor_appointments/:doctor_id", userController.getBookingAppointments);
router.put("/completed_Appointment/:appointment_id", userController.completedAppointment);
router.delete("/delete_Appointment/:appointment_id", userController.deleteAppointment);
router.post("/login_patient_doctor", userController.loginPatientDoctors);




module.exports = router;
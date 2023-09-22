const dbConnection = require('../config/db');
const { passwordHash } = require('../config/helper');

const Joi = require("joi");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userController = {
  registerPatient: (req, res) => {

    const { username, email, password, phone, user_type } = req.body;

    const bodySchema = Joi.object({
      username: Joi.string().min(3).max(60).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      phone: Joi.string().min(11).max(20).required(),
      user_type: Joi.string().max(10).required()
    })

    const validateResult = bodySchema.validate({ username, email, password, phone, user_type });
    if (validateResult.error) {
      return res.status(400).json({ error: "تحقق من صحة البيانات" });
    }

    const hashedPassword = passwordHash(password);
    console.log("regstier :", hashedPassword);

    const sql = 'INSERT INTO users (username, email, password, phone, user_type) VALUES (?, ?, ?, ?, ?)';
    dbConnection.query(sql, [username, email, hashedPassword, phone, user_type], (err, result) => {
      if (err) {
        console.error('حدث خطأ أثناء التسجيل: ', err);
        return res.status(500).json({ error: 'حدث خطأ أثناء التسجيل' });
      }

      res.status(201).json({ message: 'تم التسجيل بنجاح', data: result });
    });
  },
  // loginPatient: (req, res) => {
  //   const { email, password } = req.body;
  //   const salt = crypto.randomBytes(16).toString('hex');

  //   const hashedPassword = passwordHash(password);
  //   console.log("login :", hashedPassword);

  //   const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  //   dbConnection.query(sql, [email, hashedPassword], (err, result) => {
  //     if (err) {
  //       console.log('حدث خطأ أثناء تسجيل الدخول: ', err);
  //       return res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الدخول', data: result });
  //     }

  //     const user = result[0];
  //     if (user) {
  //       const token = jwt.sign({ userId: user.user_id, email: user.email, salt }, salt);
  //       res.status(200).json({ message: 'تم تسجيل الدخول بنجاح', token });
  //     } else {
  //       res.status(401).json({ error: 'بيانات تسجيل الدخول غير صحيحة' });
  //     }

  //   })
  // },
  registerDoctor: (req, res) => {
    const { first_name, last_name, email, password, phone_number, specialty, office_location, office_location_latitude, office_location_longitude, user_type } = req.body;
    console.log(first_name, last_name, email, password, phone_number, specialty, office_location, office_location_latitude, office_location_longitude, user_type);
    const bodySchema = Joi.object({
      first_name: Joi.string().min(3).max(60).required(),
      last_name: Joi.string().min(3).max(60).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      phone_number: Joi.string().min(11).max(20).required(),
      specialty: Joi.string().min(3).required(),
      office_location: Joi.string().min(5).max(200).required(),
      office_location_latitude: Joi.number().required(),
      office_location_longitude: Joi.number().required(),
      user_type: Joi.string().max(10).required()

    })

    const validateResult = bodySchema.validate({ first_name, last_name, email, password, phone_number, specialty, office_location, office_location_latitude, office_location_longitude, user_type});

    if (validateResult.error) {
      return res.status(400).json({ error: 'تحقق من صحة البيانات' });
    }

    const hashedPassword = passwordHash(password);
    const sql = 'INSERT INTO doctors (first_name, last_name, email, password, phone_number, specialty, office_location, office_location_latitude, office_location_longitude, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    dbConnection.query(sql, [first_name, last_name, email, hashedPassword, phone_number, specialty, office_location, office_location_latitude, office_location_longitude, user_type], (err, result) => {
      if (err) {
        console.error('حدث خطأ أثناء التسجيل: ', err);
        return res.status(500).json({ error: 'حدث خطأ أثناء التسجيل' });
      }

      res.status(201).json({ message: 'تم التسجيل بنجاح', data: result });
    })
  },
  // loginDoctor: (req, res) => {
  //   const { email, password } = req.body;
  //   const salt = crypto.randomBytes(16).toString('hex');

  //   const hashedPassword = passwordHash(password);

  //   const sql = 'SELECT * FROM doctors WHERE email = ? AND password = ?';
  //   dbConnection.query(sql, [email, hashedPassword], (err, result) => {
  //     if (err) {
  //       console.log('حدث خطأ أثناء تسجيل الدخول: ', err);
  //       return res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الدخول', data: result });
  //     }

  //     const user = result[0];
  //     if (user) {
  //       const token = jwt.sign({ userId: user.user_id, email: user.email, salt }, salt);
  //       res.status(200).json({ message: 'تم تسجيل الدخول بنجاح', token });
  //     } else {
  //       res.status(401).json({ error: 'بيانات تسجيل الدخول غير صحيحة' });
  //     }

  //   })
  // },
  bookingAppointments: (req, res) => {
    const { patient_id, doctor_id, appointment_date, status } = req.body;
    console.log(patient_id, doctor_id, appointment_date, status);

    const bodySchema = Joi.object({
      patient_id: Joi.number().integer().required(),
      doctor_id: Joi.number().integer().required(),
      appointment_date: Joi.string().isoDate().required(),
      status: Joi.string().valid('Scheduled', 'Cancelled', 'Completed').required()
    })

    const validateResult = bodySchema.validate({ patient_id, doctor_id, appointment_date, status })

    if (validateResult.error) {
      return res.status(400).json({ error: "تحقق من صحة البيانات" });
    }

    const sql = "INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)";
    dbConnection.query(sql, [patient_id, doctor_id, appointment_date, status], (err, result) => {
      if (err) {
        console.error('حدث خطأ أثناء تسجيل الموعد:', err);
        return res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الموعد' });
      }

      res.status(201).json({ message: 'تم تسجيل الموعد بنجاح', data: result });
    })

  },
  getBookingAppointments: (req, res) => {

    const doctorId = req.params.doctor_id;
    const sql = 'SELECT * FROM appointments WHERE status = ?';
    const status = 'Scheduled';

    dbConnection.query(sql, status, (err, result) => {
      if (err) {
        console.error('خطأ في الحصول على المواعيد المحجوزة:', err);
        res.status(500).send('حدث خطأ اثناء جلب بيانات الواعيد');
      } else {
        const appointments = result;
        const appointmentsForDoctor = appointments.filter((appointment) => appointment.doctor_id == doctorId);
        res.status(200).json(appointmentsForDoctor);
      }
    })
  },
  completedAppointment: (req, res) => {
    const appointmentId = req.params.appointment_id;
    const status = "Completed";

    const sql = "UPDATE appointments SET status = ? WHERE appointment_id = ?";
    dbConnection.query(sql, [status, appointmentId], (err, result) => {
      if (err) {
        console.error('حدث خطأ أثناء انجاز الموعد:', err);
        res.status(500).json({ error: 'حدث خطأ أثناء انجاز الموعد' });
      } else {
        res.status(200).json({ message: 'تم انجاز الموعد بنجاح', data: result });
      }
    })
  },
  deleteAppointment: (req, res) => {
    const appointmentId = req.params.appointment_id;
    const sql = "DELETE FROM appointments WHERE appointment_id = ?";
    dbConnection.query(sql, [appointmentId], (err, result) => {
      if (err) {
        console.error('حدث خطأ أثناء حذف الموعد:', err);
        return res.status(500).json({ error: 'حدث خطأ أثناء حذف الموعد' });
      }

      res.status(200).json({ message: 'تم حذف الموعد بنجاح', data: result });
    })
  },
  loginPatientDoctors: (req, res) => {
    const { email, password, user_type } = req.body;
    const salt = crypto.randomBytes(16).toString('hex');

    const hashedPassword = passwordHash(password);

    if (user_type === "doctor") {
      const sql = 'SELECT * FROM doctors WHERE email = ? AND password = ?';

      dbConnection.query(sql, [email, hashedPassword], (err, result) => {
        if (err) {
          console.log('حدث خطأ أثناء تسجيل الدخول: ', err);
          return res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الدخول الطبيب', data: result });
        }

        const user = result[0];
        if (user) {
          const token = jwt.sign({ userId: user.user_id, email: user.email, salt }, salt);
          res.status(200).json({ message: 'تم تسجيل دخول الطبيب بنجاح', token });
        } else {
          res.status(401).json({ error: 'بيانات تسجيل دخول الطبيب غير صحيحة' });
        }

      })
    } else if (user_type === "patient") {
      
      const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
      dbConnection.query(sql, [email, hashedPassword], (err, result) => {
        if (err) {
          console.log('حدث خطأ أثناء تسجيل الدخول: ', err);
          return res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الدخول المريض', data: result });
        }

        const user = result[0];
        if (user) {
          const token = jwt.sign({ userId: user.user_id, email: user.email, salt }, salt);
          res.status(200).json({ message: 'تم تسجيل دخول المريض بنجاح', token });
        } else {
          res.status(401).json({ error: 'بيانات تسجيل دخول  المريض غير صحيحة' });
        }

      })
    }

  },

};

module.exports = userController;

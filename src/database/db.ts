import { createConnection } from "typeorm";
import { PatientEntity, DoctorEntity } from "../entities/user_entity";

export const db = createConnection({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "",
    database: 'medicare',
    entities: [PatientEntity, DoctorEntity],
    synchronize: true
})


// import { createConnection } from "typeorm";
// import { config as dotenvConfig } from 'dotenv';
// import { User_entity } from "../entities/user_entity";

// dotenvConfig();


// export const db = createConnection({
//     type: "mysql",
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     entities: [User_entity],
//     synchronize: true
// })
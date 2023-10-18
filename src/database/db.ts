import { createConnection } from "typeorm";
import { PatientEntity, DoctorEntity } from "../entities/user_entity";
import { AppointmentEntity } from "../entities/appointment_entity";

const db = async () => {
    try {
        await createConnection({
            type: "mysql",
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: "",
            database: 'medicare',
            entities: [PatientEntity, DoctorEntity, AppointmentEntity],
            synchronize: true
        })
        console.log("connected to mySql");

    } catch (error) {
        console.log(error);
        throw new Error("unable to connect to mySql")
    }
}

export default db

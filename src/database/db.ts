import { createConnection } from "typeorm";
import { User_entity } from "../entities/user_entity";

export const db = createConnection({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: "",
    database: 'medicare',
    entities: [User_entity],
    synchronize: true
})
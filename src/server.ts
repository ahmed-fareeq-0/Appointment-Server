import express from "express";
import { user_route } from "./routes/user_route";
import './database/db';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", user_route);

app.listen(3002, () => {
    console.log('onnnnnnnn');
})
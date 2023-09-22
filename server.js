require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors")
require("./config/db");
app.use(express.json());
app.use(cors())

const userRoutes = require("./routes/userRoutes");

// app.get('/api', (req, res) => {
//     res.send("ok")
// })

app.use("/api/users", userRoutes)

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server up and running on PORT", process.env.SERVER_PORT);
})
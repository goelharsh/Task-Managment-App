const express = require("express")
const app = express()
const dotenv = require("dotenv")
const PORT  = process.env.PORT ||4000;
const database = require("./config/database")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/user")
const taskRoutes = require("./routes/task")
dotenv.config()

database.connect()
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin:"*",
        credentials:true
    })
)



app.get("/", (req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})

app.use("/user", userRoutes)
app.use("/task", taskRoutes)

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})
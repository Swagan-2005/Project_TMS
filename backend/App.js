const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express=require("express")
const cors=require("cors")
const Trainerroutes=require("./routes/Trainerroutes")
const Courseroutes=require("./routes/Courseroutes")
const Studentroutes=require("./routes/Studentroutes")
const app=express()
const mongodb=require("./config/db")
mongodb()
app.use(cors())
app.use(express.json())
app.use('/api',Trainerroutes)
app.use('/api',Courseroutes)
app.use('/api',Studentroutes)
app.get("/", (req, res) => {
    res.send("Backend running");
});
module.exports = app;
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const userRouter = require('./routers/userRouter')
const eventRouter = require('./routers/eventRouter')
const app = express()
require('dotenv').config()
const path = require('path')

const port = process.env.PORT || 5000 
app.use(cors());
app.use(express.json())
app.use(userRouter)
app.use(eventRouter)
app.use(express.urlencoded( {extended: true }))

// db connection
const db = process.env.dbURI

mongoose.connect( db,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify:false
})

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "client", "build", "index.html"));});

app.listen( port , () => {
    console.log('Server is up at port ' , port)
})
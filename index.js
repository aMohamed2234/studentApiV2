require('dotenv').config()
// require('./models/indexStart')
const express = require('express')
// const indexStart = require('./models/indexStart')
const studentRoute = require('./routes/studentRoutes')
const courseRoute = require('./routes/courseRoute')
const authRoute = require('./routes/authRoute')
const app = express()


const helmet = require('helmet')
app.use(helmet())
const limit = require('express-rate-limit')
const limiter = limit({
    max: '100',
    windowMs: 60*60*1000,
    message: 'too many request from this ip, try again in an hour'
})
app.use('/api', limiter)


const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', studentRoute)
app.use('/api', courseRoute)
app.use('/api', authRoute)
// app.use(indexStart)


// const PORT = process.env.PORT || 4000

// app.listen( PORT, ()=>{
//     console.log(`Server is running on port: ${PORT}`);
    
// })



app.use((req, res, next)=>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})


app.use((err, res, req, next)=>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})


app.listen(process.env.port || 4000, function(){
    console.log('Now listenining For request on: http://localhost:4000');
    
})




const express = require('express')
const routes = express.Router()
const studentController = require('../controllers/studentController')
const  {verifyAccessToken, verifyRefreshToken} = require('../helpers/JWT')

routes.post('/addStudent', studentController.addStudent)


routes.get('/getAllStudents', verifyAccessToken  ,studentController.getAllStudents)

routes.get('/getStudent/:student_id', verifyAccessToken ,studentController.getStudent)

routes.get('/getAllStudentWithCourse', verifyAccessToken ,studentController.getAllStudentWithCourse)

routes.get('/getOneStudentWithCourse/:student_id', verifyAccessToken ,studentController.getOneStudentWithCourse)

routes.patch('/updateStudent/:student_id', verifyAccessToken ,studentController.updateStudent)

routes.delete('/deleteStudent/:student_id', verifyAccessToken ,studentController.deleteStudent)


module.exports = routes
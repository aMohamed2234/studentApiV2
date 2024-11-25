const express = require('express')
const routes = express.Router()
const courseController = require('../controllers/courseController')
const  {verifyAccessToken} = require('../helpers/JWT')

routes.post('/addCourse' , verifyAccessToken ,courseController.addCourse)

routes.get('/getAllCourses',verifyAccessToken ,courseController.getAllCourses)

routes.get('/getCourseById/:course_id', verifyAccessToken ,courseController.getCourseById)

routes.patch('/updateCourse/:course_id', verifyAccessToken ,courseController.updateCourse)

routes.delete('/deleteCourse/:course_id', verifyAccessToken  ,courseController.deleteCourse)

module.exports = routes
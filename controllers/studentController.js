const { where } = require('sequelize')
const db = require('../models/indexStart')
const creatError = require('http-errors')

const Student = db.students
const Course = db.courses

module.exports = {


    addStudent: async (req, res, next) => {
        try{
            const info = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                course_id: req.body.course_id
            }
            const addStudent = await Student.create(info)
            res.status(200).send(addStudent)
        }
        catch(error){
            next(error)
        }
    },


    getAllStudents: async (req, res, next) => {
        try{
            const students = await Student.findAll({})
            res.status(200).send(students)
        }
        catch(error){
            next(error)
        }
    },

    getStudent: async (req, res, next) => {
        try{
            const id = req.params.student_id
            const student = await Student.findOne({where: {student_id: id}})
            if(!student){
                throw (creatError(404), 'Student does not exist')
            }
            res.status(200).send(student)
        }
        catch(error){
            next(error)
        }
    },



    getAllStudentWithCourse: async (req, res, next)=>{
        try{
            const student = await Student.findAll({include:[{model: Course, attributes:['coursename']}]})
            res.status(200).send(student)
        }
        catch(error){
            next(error)
        }
    },

    getOneStudentWithCourse: async (req, res, next)=>{
        try{
            const id = req.params.student_id
            const student = await Student.findAll({include:[{model: Course, attributes:['coursename']}], where: {student_id: id}})
            res.status(200).send(student)
        }
        catch(error){
            next(error)
        }
    },


    updateStudent: async (req, res, next) => {
        try{
            const  id  = req.params.student_id
            const student = await Student.update(req.body, {where: {student_id: id}})
            if(!student){
                throw (creatError(404), 'Student does not exist')
            }
            res.status(200).send(`Student with id ${id} has been updated`)
        }
        catch(error){
            next(error)
        }
    },

    deleteStudent: async(req, res, next) => {
        try{
            const id = req.params.student_id
            const student = await Student.destroy({where: {student_id: id}})
            res.status(200).send(`Student with id ${id} has been deleted`)
        }
        catch(error){
            next(error)
        }
    }


}
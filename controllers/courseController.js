const db = require('../models/indexStart'); 
const createError = require('http-errors'); 

const Course = db.courses; 

module.exports = {
    // Add a new course
    addCourse: async (req, res, next) => {
        try {
            const info = {
                coursename: req.body.coursename
            };

            // Validate that the coursename matches allowed ENUM values
            if (!['certificate_software_development', 'diploma_software_development', 
                  'certificate_cyber_security', 'diploma_cyber_security']
                  .includes(info.coursename)) {
                throw createError(400, 'Invalid coursename value');
            }

            const addCourse = await Course.create(info);
            res.status(200).send(addCourse);
        } catch (error) {
            next(error);
        }
    },

    // Get all courses
    getAllCourses: async (req, res, next) => {
        try {
            const courses = await Course.findAll({});
            res.status(200).send(courses);
        } catch (error) {
            next(error);
        }
    },

    // Get a single course by ID
    getCourseById: async (req, res, next) => {
        try {
            const id = req.params.course_id;
            const course = await Course.findOne({where: {course_id: id}});

            if (!course) {
                throw (createError(404, `Course with id ${id} not found`));
            }

            res.status(200).send(course);
        } catch (error) {
            next(error);
        }
    },

    // Update a course by ID
    updateCourse: async (req, res, next) => {
        try {
            const id = req.params.course_id;
            const updatedInfo = {
                coursename: req.body.coursename
            };

            // Validate coursename
            if (updatedInfo.coursename && 
                !['certificate_software_development', 'diploma_software_development', 
                  'certificate_cyber_security', 'diploma_cyber_security']
                  .includes(updatedInfo.coursename)) {
                throw createError(400, 'Invalid coursename value');
            }

            const [updated] = await Course.update(updatedInfo, { where: { course_id: id } });

            if (!updated) {
                throw createError(404, `Course with id ${id} not found`);
            }

            res.status(200).send(`Course with id ${id} has been updated`);
        } catch (error) {
            next(error);
        }
    },

    // Delete a course by ID
    deleteCourse: async(req, res, next) => {
        try{
            const id = req.params.course_id
            const course = await Course.destroy({where: {course_id: id}})
            res.status(200).send(`Course with id ${id} has been deleted`)
        }
        catch(error){
            next(error)
        }
    }
};

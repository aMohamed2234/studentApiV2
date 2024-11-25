const db = require('../models/indexStart')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const {signAccessToken, signRefreshToken} = require('../helpers/JWT')
const {authSchema} = require('../helpers/validationSchema');
const User = db.users;


module.exports = {


    register: async (req, res, next) => {
        try{
            const {email, password} = await authSchema.validateAsync(req.body)
            const exists = await User.findOne({where: {email}})
            if(exists){
                throw createError.Conflict(`${email} has already been registred`)
            }

            const newUser = new User({email, password})
            const savedUser = await newUser.save()

            const accesToken = await signAccessToken(savedUser.user_id)
            res.status(200).send({accesToken})

        }
        catch(error){
            throw(error)
        }
    },


    getAllUser: async (req, res, next) =>{
        try{
            const user = await User.findAll({})
            res.status(200).send(user)
        }
        catch(error){
            next(error)
        }
    },

    getUserById: async (req, res, next) =>{
        try{
            const id = req.params.user_id
            const user = await  User.findOne({where: {user_id: id}})
            res.status(200).send(user)
        }
        catch(error){
            next(error)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const id = req.params.user_id;
    
            // Validate inputs (e.g., email format and password strength)
            const { email, password } = req.body;
            if (!email || !password) {
                throw createError.BadRequest('Email and password are required');
            }
    
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10); // Ensure bcrypt is installed and imported
    
            // Prepare the updated information
            const updatedInfo = {
                email,
                password: hashedPassword
            };
    
            // Update the user in the database
            const [user] = await User.update(updatedInfo, { where: { user_id: id } });
    
            if (!user) {
                throw createError.NotFound(`User with id ${id} is not registered`);
            }
    
            // Send a success response
            res.status(200).send({ message: `User with id ${id} has been updated` });
        } catch (error) {
            next(error);
        }
    },
    


    deleteUser: async(req, res, next) => {
        try{
            const id = req.params.user_id
            const user = await  User.destroy({where: {user_id: id}})
            res.status(200).send(`user with id ${id} has been deleted`)
        }
        catch(error){
            next(error)
        }
    },


    login: async (req, res, next) => {
        try{
            const result = await authSchema.validateAsync(req.body)
            const user = await User.findOne({where: {email: result.email}})
            if (!user) throw createError.NotFound('User Not Registered')


            const isMatch = await user.isValidPassword(result.password)
            if(!isMatch) throw createError.Unauthorized('invalid username/password')

            const accesToken = await signAccessToken(user.user_id)
            const refreshToken = await signRefreshToken(user.user_id)
            res.send({accesToken, refreshToken})
        }
        catch(error){
            if(error.isJoi === true) throw createError.BadRequest('invalid username/password')
                next(error)
        }
    }


}
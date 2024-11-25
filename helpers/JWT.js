const JWT = require('jsonwebtoken')
const creatError = require('http-errors')

module.exports = {



    signAccessToken: (UserId) =>{
        return new Promise((resolve, reject)=>{
            const payload = {}
            const secret = process.env.ACCESSTOKENSECRET
            const options = {
                expiresIn: '15m',
                issuer: 'Francis',
                audience: String(UserId)
            }
            JWT.sign(payload, secret, options, (error, token)=>{
                if(error) reject(error);
                resolve(token)
            })
        })
    },


    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization']) return next(creatError.Unauthorized())
            const authHeaders = req.headers['authorization']
            const bearerToken = authHeaders.split(' ')
            const token = bearerToken[1]
            JWT.verify(token, process.env.ACCESSTOKENSECRET, (err, payload)=>{
                if(err){
                    return next(creatError.Unauthorized())
                }
                req.payload = payload
                next()
            })
    },

    signRefreshToken: (UserId) => {
        return new Promise((resolve, reject)=>{
            const payload = {}
            const secret = process.env.REFRESHTOKENSECRET
            const options = {
                expiresIn: '1y',
                issuer: 'Francis',
                audience: String(UserId)
            }
            JWT.sign(payload,secret,options, (err, token)=>{
                if(err){
                    console.log(err.message)
                    return reject(creatError.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyRefreshToken: (refreshToken) =>{
        return new Promise((resolve, reject)=>{
            JWT.verify(refreshToken, process.env.REFRESHTOKENSECRET, (err, payload)=>{
                if(err) return reject(creatError.Unauthorized())
                    const UserId = payload.aud
                    resolve(UserId)
            })
        })
    }



}
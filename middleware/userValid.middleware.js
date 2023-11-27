import { loginSchema } from "../schemas/users.schemas.js";

function isLoginValid(req, res, next){
    loginSchema.validate(req.body, {abortEarly:false})
    .then((loginData) =>{
        req.body = loginData
        next()
    })
    .catch(err =>{
        res.status(400).json({errors : err.errors})
    })
}

export {
    isLoginValid
}
const jwt= require('jsonwebtoken')
const generateTokenResetPassword =(user)=>{
    return jwt.sign({user}, process.env.JWT_RESET_PASSWORD_KEY, {expiresIn: '1h'});
}

module.exports = generateTokenResetPassword
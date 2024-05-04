const sendToken = async (token,statusCode,res) => {
    
    
    const otpions = {
        expires : new Date(Date.now() + process.env.COOKIES_EXPIREIN * 24 * 60 * 60 * 1000),
        httpOnly  : true
    }
    res.status(statusCode).cookie("token",token,otpions).json({token})

}

export default sendToken;
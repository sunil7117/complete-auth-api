export const localVariable=(req,res,next)=>{
    req.app.locals={
        OTP:null,
        resetSession:false,
        email:null
    }
    
    next()
}
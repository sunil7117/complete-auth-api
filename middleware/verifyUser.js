import  jwt  from "jsonwebtoken"
export const verifyUser=(req,res,next)=>{
    const KEY=process.env.ACCESSTOKEN
    try {
        const accesstoken=req.headers.authorization.split(' ')[1]
        const decode=jwt.verify(accesstoken,KEY)
        req.user=decode
        next()
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
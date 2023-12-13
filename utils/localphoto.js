export const localVariable=(req,res,next)=>{
    req.app.locals={
        photo:null,
        uploadState:false
    }
    
    next()
}
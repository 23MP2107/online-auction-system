const jwt=require('jsonwebtoken')
exports.loginTest = async(req,res,next)=>{
    const token = req.cookies.user
    if(!token){
        req.islogin = false
        return next()
    }

    try{
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        req.islogin=true
        return next()
    }catch(err){
        console.log(err)
    }
}
exports.isLoggedin = async (req,res,next)=>{
    const token = req.cookies.user
    if(!token){
        return res.redirect('/login')
    }

    try{
        const decoded =await jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        console.log(req.user)
        return next()
    }catch(err){
        return res.cookie('user',null,{
            expires: new Date(Date.now()),
            httpOnly:true
        }).send("Sorry.. this won't work")
    }
}

exports.isAdmin = (req,res,next)=>{
    if(req.user.isAdmin==true){
        return next()
    }
    return res.redirect('/admin/login')
}
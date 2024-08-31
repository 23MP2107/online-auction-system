const userCookie=async(user,res)=>{

    const token = await user.getJwtToken()
    const options = {
        expires: new Date(Date.now()+(55*60*1000)),
        httpOnly:true
    }
    
    return res.cookie('user', token, options ).redirect('/')
}

module.exports = userCookie
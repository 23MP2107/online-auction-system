// const userCookie=async(user,res)=>{

//     const token = await user.getJwtToken()
//     const options = {
//         expires: new Date(Date.now()+(55*60*1000)),
//         httpOnly:true
//     }
    
//     return res.cookie('user', token, options ).redirect('/')
// }

// module.exports = userCookie

const userCookie = async (user, res) => {
    try {
        // Generate the token
        const token = await user.getJwtToken();

        // Define cookie options
        const options = {
            expires: new Date(Date.now() + 55 * 60 * 1000), // Cookie expiration time
            httpOnly: true, // Prevents client-side access to the cookie
        };

        // Set cookie and redirect, using return to prevent further execution
        return res.cookie('user', token, options).redirect('/');
    } catch (error) {
        // Handle potential errors
        console.error('Error setting cookie:', error);

        // Optionally, send an error response or render an error page
        if (!res.headersSent) {
            return res.status(500).send('Internal Server Error'); // Ensures headers aren't already sent
        }
    }
};

module.exports = userCookie;

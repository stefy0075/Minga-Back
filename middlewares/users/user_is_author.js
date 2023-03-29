
async function user_is_author(req,res,next) {

    if (req.user.is_author === true) {
        return next()
    }
    res.status(401).json({
        success: false,
        message: 'you are not author'
    })
}

export default  user_is_author
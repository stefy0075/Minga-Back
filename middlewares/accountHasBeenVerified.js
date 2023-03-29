async function accountHasBeenVerified(req, res, next) {
    if (req.user.is_verified) {
        return next()
    }
    return res.status(400).json({message: 'Has not been verified'})
}

export default accountHasBeenVerified
export const errorHandler = (error, req, res, next) => {
    console.error(error)
    return res.status(500).json({
        success: false,
        method: req.method,
        path: req.url,
        response: error.message
    })
}
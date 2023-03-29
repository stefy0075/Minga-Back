async function addFrontPhoto (req,res,next){
    req.body.cover_photo = req.body.pages[0]
    next()
}
export default addFrontPhoto
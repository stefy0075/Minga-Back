import express from 'express'
import createController from '../controllers/chapters/create.js';
import Schema from '../schemas/chapters/chapters.js'
import schemaEdit from '../schemas/chapters/editChapter.js'
import validator from '../middlewares/validator.js';
import nextOrder from '../middlewares/chapters/next_order.js';
import addFrontPhoto from '../middlewares/chapters/add_front_photo.js';
import existsOrder from '../middlewares/chapters/exists_order.js';
import passport from '../middlewares/passport.js';
import getChapter from '../controllers/chapters/get_chapter.js'
import getOneChapterController from "../controllers/chapters/get_one.js"
import finds_id from '../middlewares/finds_id.js';
import is_property_of from '../middlewares/authors/chapter_is_property.js'
import is_active from '../middlewares/authors/is_active.js';
import update_controller from '../controllers/chapters/update.js'
import destroy_controler from '../controllers/chapters/destroy.js'

let router = express.Router();
const {create}=createController
const {get}=getChapter
const {showOne} = getOneChapterController
const {update}=update_controller
const {destroy}=destroy_controler
router.get('/',get)
router.get('/:id', showOne)
router.put('/:id',passport.authenticate('jwt',{session:false}),validator(schemaEdit),finds_id,is_active,is_property_of,update)
router.delete('/:id',passport.authenticate('jwt',{session:false}),validator(schemaEdit),finds_id,is_active,is_property_of,destroy)
router.post('/',passport.authenticate('jwt',{session:false}),validator(Schema),existsOrder,nextOrder,addFrontPhoto,create)



export default router

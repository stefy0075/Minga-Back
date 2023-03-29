import express from "express";
import createcontroller from "../controllers/manga/create.js"
import validator from "../middlewares/validator.js";
import schema from "../schemas/mangas/mangas.js"
import updateMangaSchema from "../schemas/mangas/updateManga.js";
import existsTitle from "../middlewares/exists_title.js"
import passport from "../middlewares/passport.js";
import finds_id from "../middlewares/finds_id.js"
import is_active from "../middlewares/authors/is_active.js"
import is_property_of from "../middlewares/authors/is_property_of.js";
import get_mangas from "../controllers/manga/get_mangas_from_author.js"
import get_manga from '../controllers/manga/get_one.js'
import getMangas from '../controllers/manga/get_mangas.js'
import get_data from "../controllers/manga/get_me.js"
import update from "../controllers/manga/update.js"
import destroy from "../controllers/manga/destroy.js"


let router = express.Router();
let {create} = createcontroller
const {get_one}=get_manga
const { get_mangas_from_author } = get_mangas
const { read } = getMangas
const { get_me } = get_data
const { update_manga } = update
const {delete_manga} = destroy



router.post("/", passport.authenticate('jwt', { session: false }), validator(schema), existsTitle ,create)

router.get( "/authors/:author_id", passport.authenticate("jwt", { session: false }), get_mangas_from_author )

router.get("/me", passport.authenticate('jwt', { session: false }), finds_id, get_me)

router.put("/:id", passport.authenticate("jwt", { session: false }), validator(updateMangaSchema), finds_id, is_active, is_property_of, existsTitle, update_manga)
    
router.delete("/:id", passport.authenticate("jwt", { session: false }), finds_id, is_active, is_property_of, delete_manga)

router.get('/:id',passport.authenticate("jwt", { session: false }), get_one)

router.get('/', passport.authenticate('jwt', { session: false }), read)


export default router;

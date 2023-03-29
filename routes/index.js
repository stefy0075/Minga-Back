import express from "express";
import userRouter from "./users.js";
import mangaRouter from "./mangas.js";
import chapterRouter from "./chapters.js";
import companies from "./companies.js"
import authors from "./authors.js";
import categoriesRouter from './categories.js';
import commentsRouter from './comments.js'
import paymentRouter from './payments.js'

let router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Minga server ready" });
});

router.use("/mangas", mangaRouter);
router.use("/auth", userRouter);
router.use("/authors", authors);
router.use("/chapters", chapterRouter);
router.use("/companies", companies);
router.use("/categories", categoriesRouter)
router.use("/comments", commentsRouter)
router.use("/payments", paymentRouter)

export default router;

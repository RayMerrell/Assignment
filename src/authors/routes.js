const authorRouter = require("express").Router();

const { addAuthor, getAuthorAndBooks } = require("./controllers");

authorRouter.post("/authors/addauthor", addAuthor);
authorRouter.get("/authors/getauthorandbooks/:authorName", getAuthorAndBooks);

module.exports = authorRouter;

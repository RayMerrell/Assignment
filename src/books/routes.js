const bookRouter = require("express").Router();
const {
  addBook,
  deleteBook,
  deleteAllBooks,
  getAllBooksByGenre,
  getSingleBookByTitle,
  updateBook,
} = require("./controllers");
bookRouter.post("/books/addbook", addBook);
bookRouter.delete("/books/deletebook", deleteBook);
bookRouter.delete("/books/deleteallbooks", deleteAllBooks);
bookRouter.get("/books/getallbooks", getAllBooksByGenre);
bookRouter.get("/books/getbook/:title", getSingleBookByTitle);
bookRouter.put("/books/updatebook", updateBook);

module.exports = bookRouter;

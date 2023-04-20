const Author = require("./model");
const Book = require("../books/model");
const Genre = require("../genre/model");

const addAuthor = async (req, res) => {
  try {
    const newAuthor = await Author.create({
      authorName: req.body.authorName,
    });
    //formatted output as per design specification
    const successResponse = {
      message: "New author added",
      author: { id: newAuthor.id, author: newAuthor.authorName },
    };
    res.status(201).json(successResponse);
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const getAuthorAndBooks = async (req, res) => {
  try {
    console.log("fetching author");
    console.log("AuthorName", req.params.authorName);
    const ourAuthor = await Author.findOne({
      where: { authorName: req.params.authorName },
    });
    console.log("Author:", ourAuthor);
    const books = await ourAuthor.getBooks({ include: [Author, Genre] });
    //formatting output as per design specifications
    let authorsBooks = [];
    console.log("Bookslist", books);
    books.map((book) => {
      nextBook = {
        id: book.id,
        title: book.title,
        author: book.Author.authorName,
        genre: book.Genre.genre,
        AuthorId: book.AuthorId,
      };
      authorsBooks.push(nextBook);
    });
    const successResponse = {
      message: "success",
      books: authorsBooks,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};
module.exports = {
  getAuthorAndBooks,
  addAuthor,
};

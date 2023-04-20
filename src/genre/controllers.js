const Author = require("../authors/model");
const Genre = require("./model");

const addGenre = async (req, res) => {
  try {
    const newGenre = await Genre.create({
      genre: req.body.genre,
    });
    //formatted output as per design specification
    const successResponse = {
      message: "New Genre added",
      Genre: { id: newGenre.id, Genre: newGenre.genre },
    };
    res.status(201).json(successResponse);
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const getAllBooks = async (req, res) => {
  try {
    console.log("fetching genre");
    const ourGenre = await Genre.findOne({
      where: { genre: req.params.genre },
    });
    console.log("Genre:", ourGenre);
    const books = await ourGenre.getBooks({ include: [Author, Genre] });
    //formatting output as per design specifications
    let genreBooks = [];
    console.log("Bookslist", books);
    books.map((book) => {
      nextBook = {
        id: book.id,
        title: book.title,
        author: book.Author.authorName,
        genre: book.Genre.genre,
        AuthorId: book.Author.id,
        GenreId: book.Genre.id,
      };
      genreBooks.push(nextBook);
    });
    const successResponse = {
      message: "success",
      booksByGenre: genreBooks,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};
module.exports = { addGenre, getAllBooks };

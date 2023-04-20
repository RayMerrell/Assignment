const Book = require("./model");
const Author = require("../authors/model");
const Genre = require("../genre/model");

const addBook = async (req, res) => {
  try {
    data = req.body;
    const [ourAuthor, createdAuthor] = await Author.findOrCreate({
      where: { authorName: data.author },
    });
    const [ourGenre, createdGenre] = await Genre.findOrCreate({
      where: { genre: data.genre },
    });
    const newBook = await Book.create({
      title: data.title,
      AuthorId: ourAuthor.id,
      GenreId: ourGenre.id,
    });
    //formatting output data, as per specification
    const responseBook = {
      title: newBook.title,
      author: ourAuthor.authorName,
      genre: ourGenre.genre,
      id: newBook.id,
    };
    res.status(201).json({ message: "success", newBook: responseBook });
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const numberOfDeletedRecords = await Book.destroy({
      where: { title: req.body.title },
    });
    res.status(201).json({
      message: "successfully deleted",
      result: numberOfDeletedRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const deleteAllBooks = async (req, res) => {
  try {
    const numberOfDeletedRecords = await Book.destroy({
      truncate: true,
    });
    res.status(201).json({
      message: "successfully deleted",
      result: numberOfDeletedRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};
const getAllBooksByGenre = async (req, res) => {
  try {
    console.log("fetching genre");
    const ourGenre = await Genre.findOne({
      where: { genre: req.body.genre },
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
      };
      genreBooks.push(nextBook);
    });
    const successResponse = {
      message: "success",
      books: genreBooks,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};
const getSingleBookByTitle = async (req, res) => {
  try {
    console.log("fetching genre");
    const ourBook = await Book.findOne({
      where: { title: req.params.title },
      include: [Author, Genre],
    });
    console.log("Book:", ourBook);
    //formatting output as per design specifications
    const resultBook = {
      id: ourBook.id,
      title: ourBook.title,
      author: ourBook.Author.authorName,
      genre: ourBook.Genre.genre,
    };
    const successResponse = {
      message: "success",
      books: resultBook,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    console.error(error);
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const updateBook = async (req, res) => {
  /*expecting req.body = {
    title:string,
    field:string e.g "newGenre" || "newAuthor"
    value:string
  }
  */

  try {
    let newValue = 0;
    let fieldName = "";
    console.log("field", req.body.field, "Value", req.body.value);
    if (req.body.field === "newGenre") {
      const [ourGenre, createdGenre] = await Genre.findOrCreate({
        where: { genre: req.body.value },
      });
      newValue = ourGenre.id;
      fieldName = "GenreId";
    } else {
      //assuming field:newAuthor
      const [ourAuthor, createdAuthor] = await Author.findOrCreate({
        where: { authorName: req.body.value },
      });
      newValue = ourAuthor.id;
      fieldName = "AuthorId";
    }
    console.log("field", fieldName, "newValue", newValue);
    const result = await Book.update(
      { [fieldName]: newValue },
      { where: { title: req.body.title } }
    );
    res.status(201).json({ message: "Success", updateResult: result[0] });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addBook,
  deleteBook,
  deleteAllBooks,
  getAllBooksByGenre,
  getSingleBookByTitle,
  updateBook,
};

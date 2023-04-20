require("dotenv").config();
const express = require('express');
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());

const Author = require("./authors/model");
const authorRouter = require("./authors/routes");

const Book = require("./books/model");
const bookRouter = require("./books/routes");

const Genre = require("./genre/model");
const genreRouter=require("./genre/routes");

app.use(authorRouter);
app.use(bookRouter);
app.use(genreRouter);

const syncTables = () => {
  console.log("Syncing");
  Author.hasMany(Book);
  Book.belongsTo(Author);
  Genre.hasMany(Book);
  Book.belongsTo(Genre);
/* //this should only be needed once
  Author.sync({alter:true});
  Genre.sync({alter:true});
  Book.sync({alter:true});
  */
};
syncTables();

app.get('/', (req, res)=>{
    res.send("Connection established");
});
app.get("/health", (req, res) => {
    res.status(200).json({ message: "App is healthy" });
  });
app.listen (port, ()=>console.log("Server is listening"));
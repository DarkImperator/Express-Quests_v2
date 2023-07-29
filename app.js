const express = require("express");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list & my worst users :'(");
};
app.get("/", welcome);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.addMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
app.post("/api/users", userHandlers.addUser);
app.put("/api/users/:id", userHandlers.updateUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

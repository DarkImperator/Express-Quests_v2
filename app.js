const express = require("express");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { validateMovie } = require("./validateMovie.js");
const { validateUser  } = require("./validateUser.js");
const { hashPassword } = require("./auth")
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
app.post("/api/movies", validateMovie, movieHandlers.addMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
// app.post("/api/users", validateUser, hashPassword, userHandlers.addUser);
// app.put("/api/users/:id", validateUser, hashPassword, userHandlers.updateUser);
app.post("/api/users", hashPassword, userHandlers.addUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

// const isItDwight = (req,res) => {
//   if(req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
//     res.send("Credentials are valid");
//   } else {
//     res.sendStatus(401);
//   }
// };

const verifyPassword = (req, res) => {
  res.send(req.user);
}

app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

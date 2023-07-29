const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([poulet]) => {
      res.json(poulet);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database Movies");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Not Found Movies bro");
    });
};

const addMovie = (req, res) => {
  // console.log(req.body);
  // res.send("Post route is working 🎉");
  // const movie = req.body;  // 1 jet, ne marche pas !
  const { title, director, year, color, duration } = req.body;

  database
    .query("INSERT INTO movies (title, director, year, color, duration) VALUES (?,?,?,?,?)",
      // [movie.title, movie.director, movie.year, movie.color, movie.duration])
      [title, director, year, color, duration])
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send("Error saving the fu***g movie !?!");
    });
};

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query("UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? WHERE id = ?",
    [title, director, year, color, duration, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {            // Je n'avais pas pensé à la condition ...
        res.sendStatus(404).send("Are you kidding me ?? You don't put ANYthing !?")
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send("Error editing the movie")
    })
}

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
};

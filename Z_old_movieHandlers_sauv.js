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

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database Users");
    });
};
//==============================
// const getMovies = (req, res) => {
//   database
//     .query("select * from movies")
//     .then(([movies]) => {
//       res.json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database Movies");
//     });
// };

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Not Found Users bro");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  getUsers,
  getUsersById,
};

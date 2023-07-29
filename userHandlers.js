const database = require("./database");

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

const addUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?,?,?,?,?)",
      [firstname, lastname, email, city, language])
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send("Error saving the new fu***g beach user !?!");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query("UPDATE users SET firstname = ?,lastname = ?,email = ?,city = ?,language = ? WHERE id = ?",
    [firstname, lastname, email, city, language, id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404).send("Are you jokking ???")
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send("Error updating this user, bro ...")
    })
}

module.exports = {
  getUsers,
  getUsersById,
  addUser,
  updateUser,
};

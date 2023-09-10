const database = require("./database");

const getUsers = (req, res) => {
  // const initialSql = "SELECT * FROM users";
  const initialSql = "SELECT id,firstname,lastname,email,city,language FROM users";
  const where = [];
  
  if(req.query.language != null) {
    where.push({
      colum: "language",
      value: req.query.language,
      operator: "=",
    });
  }
  if(req.query.city) {
    where.push({
      colum: "city",
      value: req.query.city,
      operator: "=",
    });
  }
  // Pour test ! N'interfère pas dans l'exo !
  // if(req.query.firstname) {
  //   where.push({
  //     colum: "firstname",
  //     value: req.query.firstname,
  //     operator: "=",
  //   })
  // }

  database
    .query(
      where.reduce(
        (sql, {colum, operator}, index) => 
          `${sql} ${index === 0 ? "WHERE" : "AND"} ${colum} ${operator} ?`,
          initialSql || console.log(sql)
      ),
      where.map(({value}) => value)
    )
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database Users");
    });
};

// // Sauvegarde de ma fonction de départ :
// const getUsers = (req, res) => {
//   database
//     .query("select * from users")
//     .then(([users]) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database Users");
//     });
// };

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    // .query("select id,firstname,lastname,email,city,language from users where id = ?", [id])
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Not Found Users bro");
    });
};

const addUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query("INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?,?,?,?,?,?)",
      [firstname, lastname, email, city, language, hashedPassword])
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

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("DELETE FROM users WHERE id = ? ", [id])
    .then(([result]) => {
      if(result.affectedRows === 0) {
        res.sendStatus(404).send("User not found")
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send("Error deleting the user")
    })
}

const getUserByEmailWithPasswordAndPassToNext  = (req, res, next) => {
  const { email } = req.body;
  // const email = req.body.email; // Autre possibilite de notation

  database
    .query("select * from users where email = ?", [email])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];
        next();
      } else {
        res.status(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });

};

module.exports = {
  getUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmailWithPasswordAndPassToNext,
};

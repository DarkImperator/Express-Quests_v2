const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

 // version classique avec prommesses .hash et .then :
// const hashPassword = (req, res, next) => {
//     argon2
//     .hash(req.body.password, hashingOptions)
//     .then((hashedPassword) => {
//       // console.log(hashedPassword);

//       req.body.hashedPassword = hashedPassword;
//       delete req.body.password;

//       next();
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

 // version avec async/await :
const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    req.body.hashedPassword = hashedPassword;
      delete req.body.password;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

 // version classique avec prommesses .verify et .then :
const verifyPasswordV1 = (req, res, next) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((passwordMatch) => {
      if(passwordMatch) {
        res.send("Credentials are valid")
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// // version avec async/await :
// const verifyPasswordV1 = async (req, res) => {
//   try {
//     if(await argon2.verify(req.user.hashedPassword, req.body.password)) {       // Attention dans l'ordre de req.user et req.body ... req.user en 1er, req.body en second !
//       // password match
//       res.send("Credentials are valid");
//     } else {
//       // password did not match
//       res.sendStatus(401);
//     }
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// }

const verifyPasswordV2 = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        // res.send("Credentials are valid");
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h",});
        // delete req.user.hashPassword; => erreur dans la selections des variables lors de l'exercice, et donc, cette ligne ne fait rien et donc le hashedpassword est visible !
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
        // res.send(token); // Autre possibilité plus simple ...
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// // version avec async/await :
// const verifyPasswordV2 = async (req, res) => {
//   try {
//     if(await argon2.verify(req.user.hashedPassword, req.body.password)) {
//       const payload = { sub: req.user.id };
//       const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h",});
//       delete req.user.hashedPassword;
//       res.send({ token, user: req.user });
//     } else {
//       res.sendStatus(401);
//     }
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   };
// };

// verifyTokenV1 => consigne sans le bonus :
const verifyTokenV1 = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if(authorizationHeader == null) {
      throw new Error("Authorization Header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");
    if(type !== "Bearer") {
      throw new Error("Authorization Header has not the 'Bearer' type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

// verifyTokenV2 => consigne avec bonus: PUT et DELETE ne devraient fonctionner que si l'id correspond à celui du payload du token :
// A modifier et a repasser sur verifyTokenV1 si pb ! Merci de votre retour !
const verifyTokenV2 = (req, res, next) => {
  try {
    const autorhead = req.get("Authorization");
    if(autorhead == null) {
      throw new Error("Authorization Header is missing");
    }
    const [type, token] = autorhead.split(" ");
    if(type !== "Bearer") {
      throw new Error("Authorization Header has not the 'Bearer' type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    if (req.params.id !== req.payload.sub) {
      res.sendStatus(403);
    } else {
      req.payload = payload;
      next();
    } 
  }catch (err) {
    console.error(err);
    res.sendStatus(401);
  };
};

// Au debut que çà ! :
// const verifyPassword = (req, res) => {
// res.send(req.user);
// }



module.exports = {
    hashPassword,
    verifyPasswordV1,
    verifyPasswordV2,
    verifyTokenV1,
    verifyTokenV2,
}

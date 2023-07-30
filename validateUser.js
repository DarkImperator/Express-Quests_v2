//  <===================== Manuellement : =====================>

const validateUser = (req, res, next) => {

    const { firstname, lastname, email, city, language } =req.body;
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
    const poulet = [];

    if(firstname == null) {
        poulet.push({field: "firstname", message: "The field is required"});
    } else if(firstname.length >= 255) {
        poulet.push({field: "firstname", message: "The field is too long (max 255caracters)"});
    }
    if(lastname == null) {
        poulet.push({field: "lastname", message: "The field is required"});
    } else if(lastname.length >= 255) {
        poulet.push({field: "lastname", message: "The field is too long (max 255caracters)"});
    }
    if(email == null) {
        poulet.push({field: "email", message: "The field is required"});
    } else if(email.length >= 255) {
        poulet.push({field: "email", message: "The field is too long (max 255caracters)"});
    } else if (!emailRegex.test(email)) {
        poulet.push({ field: 'email', message: 'Invalid email' });
    }
    if(city == null) {
        poulet.push({field: "city", message: "The field is required"});
    } else if(city.length >= 255) {
        poulet.push({field: "city", message: "The field is too long (max 255caracters)"});
    }
    if(language == null) {
        poulet.push({field: "language", message: "The field is required"});
    } else if(language.length >= 255) {
        poulet.push({field: "language", message: "The field is too long (max 255caracters)"});
    }

    if(poulet.length) {
        res.status(422).json({ validationErrors: poulet });
    }else {
        next();
    }
}

module.exports = {
    validateUser,
}

// //  <===================== With joi : =====================>

// const Joi = require("joi");

// const userSchema = Joi.object({
//     email: Joi.string().email().max(255).required(),
//     firstname: Joi.string().max(255).required(),
//     lastname: Joi.string().max(255).required(),
//     city: Joi.string().max(255).required(),
//     language: Joi.string().max(255).required(),
//   });

// const validateUser = (req, res, next) => {
//     const { firstname, lastname, email, city, language } = req.body;

//     const { error } = userSchema.validate(
//         { firstname, lastname, email, city, language },
//         { abortEarly: false }
//       );
    

//     if(error) {
//         res.status(422).json({ validationErrors: error.details });
//     }else {
//         next();
//     }
// }

// module.exports = {
//     validateUser,
// }

//  <===================== With express-validator : =====================>

// const { body, validationResult } = require('express-validator');

// const validateUser = [
//     body("email").isEmail(),
//     body("firstname").isLength({ max: 255 }),
//     body("lastname").isLength({ max: 255 }),
//     body("city").isLength({ max: 255 }),
//     body("language").isLength({ max: 255 }),
//     (req, res, next) => {
//         const errors = validationResult(req);
    
//         if (!errors.isEmpty()) {
//             res.status(422).json({ validationErrors: errors.array() });
//           } else {
//             next();
//           }
//     }
// ]

// module.exports = {
//     validateUser,
// }
// const joi = require("joi")

// const validator = (req, res, next) => {
//    const schema = joi.object({
//       name: joi
//          .string()
//          .trim()
//          .min(2)
//          .max(20)
//          .required()
//          .pattern(new RegExp("[a-zA-Z]$"))
//          .messages({
//             "string.empty": "El campo nombre no puede estar vacio",
//             "string.min":
//                "El campo nombre debe contener como mínimo 2 caracteres",
//             "string.max": "El campo nombre no puede tener mas de 20 caracteres",
//             "string.pattern.base": "El campo nombre solo puede contener letras",
//          }),
//       lastName: joi
//          .string()
//          .trim()
//          .min(2)
//          .max(20)
//          .required()
//          .pattern(new RegExp("[a-zA-Z]$"))
//          .messages({
//             "string.empty": "El campo apellido no puede estar vacio",
//             "string.min":
//                "El campo apellido debe contener como mínimo 2 caracteres",
//             "string.max":
//                "El campo apellido no puede tener mas de 20 caracteres",
//             "string.pattern.base":
//                "El campo apellido solo puede contener letras",
//          }),
//       password: joi.string().min(6).trim().required().messages({
//          "string.empty": "El campo contraseña no puede estar vacio",
//          "string.min":
//             "El campo contraseña debe contener como mínimo 6 caracteres",
//       }),
//       src: joi.string().required().uri().messages({
//          "string.empty": "El campo foto de perfil no puede estar vacio",
//          "string.uri": "El campo foto de perfil debe contener una URL válida",
//       }),
//       mail: joi.string().trim().email().required().messages({
//          "string.empty": "El campo email no puede estar vacio",
//          "string.email": "El campo email debe contener un email válido",
//       }),
//       google: joi.boolean(),
//    })

//    const validation = schema.validate(req.body, { abortEarly: false })

//    if (!validation.error) {
//       next()
//    } else {
//       res.json({ success: false, errors: validation.error.details })
//    }
// }

// module.exports = validator

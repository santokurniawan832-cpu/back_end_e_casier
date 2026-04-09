const { body, validationResult } = require("express-validator");

const registerValidation = [
    body("name")
        .notEmpty()
        .withMessage("Nama wajib diisi"),

    body("email")
        .notEmpty()
        .withMessage("Email wajib diisi")
        .bail()
        .isEmail()
        .withMessage("Format email tidak valid"),

    body("password")
        .notEmpty()
        .withMessage("Password wajib diisi")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password minimal 6 karakter"),

    body("role_id")
        .notEmpty() 
        .withMessage("Jabatan utama harus ada.")
];

const validate = (req, res, next) => {
    // melakukan validasi request dari express
    const errors = validationResult(req);

    // mengecek jika benar ada error
    if (!errors.isEmpty()) {
        // membuat format error berbentuk objek
        const formattedErrors = {};

        // karna errorsnya bebentuk array, maka dilakukan perulangan / pembongkaran / mapping
        errors.array().forEach(err => {
            if (!formattedErrors[err.path]) {
                formattedErrors[err.path] = [];
            }
            // memasukkan pesan error kedalm objek
            formattedErrors[err.path].push(err.msg);
        });

        // return response 422 UNPROCCESS CONTENT
        return res.status(422).json({
            message: "Validasi gagal",
            errors: formattedErrors
        });
    }
    next();
};


module.exports = {
    registerValidation,
    validate
};

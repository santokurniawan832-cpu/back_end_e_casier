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

    body("role")
        .optional() // boleh ada, boleh tidak
        .isIn(["admin", "user"])
        .withMessage("Role harus 'admin' atau 'user'")
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validasi gagal",
            errors: errors.array()
        });
    }
    next();
};


module.exports = {
    registerValidation,
    validate
};

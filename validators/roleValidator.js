const { body, validationResult } = require("express-validator");
const storeValidation = [
    body("name").notEmpty().withMessage("Nama Jabatan diisi"),
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

module.exports = { storeValidation, validate };
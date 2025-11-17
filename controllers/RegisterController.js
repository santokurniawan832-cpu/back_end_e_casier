// memanggil UserServices untuk  menggunakan fungsi register dan login
const UserService = require('../services/UserService')
const jwt = require("jsonwebtoken");
class RegisterController {
    // fungsi untuk melakukan register user
    static  async storeRegister(req, res){
        try {
            const { name, email, password } = req.body;
            const user = await UserService.register({ name, email, password })

            // mengirim response json
            res.status(201).json({
                message: 'User Berhasil registrasi',
                data: user,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

module.exports = RegisterController;
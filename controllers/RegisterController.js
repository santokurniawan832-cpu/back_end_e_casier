// memanggil UserServices untuk  menggunakan fungsi register dan login
const UserService = require('../services/UserService')

class RegisterController {
    // fungsi untuk melakukan register user
    static  async storeRegister(req, res){
        try {
            const user = await UserService.register(req.body)

            // mengirim response json
            res.json({
                message: 'User Berhasil registrasi',
                data: user
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

module.exports = RegisterController;
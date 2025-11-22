// memanggil UserServices untuk  menggunakan fungsi register dan login
const UserService = require('../../services/UserService')

class LoginController {
    // fungsi untuk melakukan login user
   static async storeLogin(req, res) {
        try {
            const user = await UserService.login(req.body);
            res.json({
                message: "Login berhasil",
                data: user
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = LoginController;
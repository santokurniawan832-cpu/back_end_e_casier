// memanggil UserServices untuk  menggunakan fungsi register dan login
const UserService = require('../../services/UserService')
const jwt = require("jsonwebtoken");
class RegisterController {
    // fungsi untuk melakukan register user
    static  async storeRegister(request, response){
        try {
            const { name, email, password } = request.body;
            const result = await UserService.register({ name, email, password })

            // mengecek jika ada response error
            if (result.error) {
                return response.status(409).json({
                    status: 409,
                    message: result.message
                });
            }
            // mengirim response json berhasil
            response.status(201).json({
                message: 'User Berhasil registrasi',
                data: {
                    user: result.user,
                    token: result.token
                }
            })
        } catch (error) {
            return response.status(500).json({
                message: error.message || "Internal server error"
            });
        }
    }
}

module.exports = RegisterController;
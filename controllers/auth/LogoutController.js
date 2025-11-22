// memanggil class UserServices untuk  menggunakan fungsi register dan login
const UserService = require('../../services/UserService')

class LogoutController {
    // fungsi untuk melakukan login user
   static async authLogout(req, res) {
        try {
            // mengambil headers
            const authHeader = req.headers["authorization"];

            // mengecek apakah authHeader ada atau tidak
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header tidak ada" });
        }

        // mengambil token
         const token = authHeader.split(" ")[1];
            
        // menggunakan fungsi logout
        const result = await UserService.logout(token);

        // mengembalikan response
          res.json(result);

        } catch (error) {
            // mengembalikan respnse error message
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = LogoutController;
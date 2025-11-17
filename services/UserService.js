// memanggil file class User
const User = require('../models/User');

// memanggil fungsi bcrpty
const bcrpty = require("bcrypt")

class UserService {
    // fungsi melakukan register
    static async register({ name, email, password }) { // name, email, password destructuring parameter
        
        // mengambil data user hanya 1 data user saja
        const userExist = await User.findOne({ where: { email } }) // destructuring  menjadi objek

        if (userExist) {
            throw new Error("Email sudah digunakan");
        }

        // melakukan enkripsi passwird
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }

    // fungsi melakukan login
   static async login({ email, password }) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("Email tidak ditemukan");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Password salah");
        }

        return user;
    }
}


module.exports = UserService;
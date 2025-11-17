// memanggil file class User
const User = require('../models/User');

// memanggil fungsi bcrpty
const bcrypt = require("bcrypt");

// memanggil fungsi jwt
const jwt = require("jsonwebtoken");
const { type } = require('os');

class UserService {
    // fungsi melakukan register
    static async register({ name, email, password }) { // name, email, password destructuring parameter
        
        // mengambil data user hanya 1 data user saja
        const userExist = await User.findOne({ where: { email } }) // destructuring  menjadi objek

        // menge
        if (userExist) {
             throw new Error("Email sudah terdaftar");
        }

        // melakukan enkripsi password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // membuat expired token nantinya
        const expiresIn = 60 * 60 * 24 * 7; // 604800 detik
        
        // membuat token 
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn }
        )

        // mengembalikan nilai
        return {
             user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token: {
                type: "Bearer", 
                value: token,
                expires_in: expiresIn
            }
        };
    }

    // fungsi melakukan login
   static async login({ email, password }) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("Email tidak ditemukan");
        }

        // membandingkan password yang dienkripsi dengan inputan password 
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Password salah");
        }
        // membuat timer expired token nantinya
        const expiresIn = 60 * 60 * 24 * 7;

        // generate token login
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn }
        );
        return { 
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }, 
            token: {
                type: "Bearer",
                value: token, 
                expired_in: expiresIn
            } 
        };
    }
}

module.exports = UserService;
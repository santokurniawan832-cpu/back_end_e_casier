// memanggil file class User
const User = require('../models/User');

// memanggil file signature beserta alamatnya
const createSignature = require("../utils/signature.js");   

// memanggil fungsi bcrpty untuk enkripsi password
const bcrypt = require("bcrypt");

// memanggil fungsi jwt untuk mengurus json web token yang akan dikirim ketika register ataupun login
const jwt = require("jsonwebtoken");

class UserService {
    // fungsi melakukan register
    static async register({ name, email, password }) { // name, email, password destructuring parameter
        
        // mengambil data user hanya 1 data user saja
        const userExist = await User.findOne({ where: { email } }) // destructuring  menjadi objek

        // mengecek data user ada atau tidak 
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

        // membuat signature untuk token yang akan dikirim melalui response
        const signature = createSignature({ id: user.id, email: user.email });

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
                signature: signature,
                expires_in: expiresIn
            }
        };
    }

   
   static async login({ email, password }) {  // email dan password sudah didesctructuring objek
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
// memanggil file class User
const User = require("../repositories/User.js");

// memanggil class crypto
const crypto = require("crypto");

// memanggil file signature beserta alamatnya
const createSignature = require("../utils/signature.js");   

// memanggil fungsi bcrpty untuk enkripsi password
const bcrypt = require("bcrypt");

// memanggil fungsi jwt untuk mengurus json web token yang akan dikirim ketika register ataupun login
const jwt = require("jsonwebtoken");

//memanggil class TokenBlackList untuk menggunakan fungsi create dan exists
const TokenBlackList = require("../utils/TokenBlackList.js")

class UserService {
    // fungsi melakukan register
    static async register({ name, email, password }) { // name, email, password destructuring parameter
        
        // mengambil data user hanya 1 data user saja
        const userExist = await User.findOne({ where: { email } }) // destructuring  menjadi objek

        // mengecek data user ada atau tidak 
        if (userExist) {
            return {
                error: true,
                message: "Email sudah terdaftar"
            };
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

        // pengecekan bila email user tidak ada atau tidak sesuai
        if (!user) {
            
            // melakukan custome objek yang akan dikirim bila error tidak ada email
             throw {
                status: 401,
                message: 'Validasi gagal dari services',
                errors: {
                    email: 'Email tidak valid'
                }
            }
        }

        // membandingkan password yang dienkripsi dengan inputan password 
        const match = await bcrypt.compare(password, user.password);
        if (!match) {

            // melakukan custome objek yang akan dikirim bila error password tidak valid
            throw {
                status: 401,
                message: 'Validasi password gagal',
                errors: {
                    password: 'Password tidak valid'
                }
            }
        }
        
        // membuat timer expired token nantinya
        const expiresIn = 60 * 60 * 24 * 7;

        // generate token login
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn }
        );

        // membuat signature agar dikirim melalui response
        const signature = crypto.createHash("sha256").update(token).digest("hex");

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
                expired_in: expiresIn
            } 
        };
    }

    static async logout(token) {
        // mengecek token yang disimpan apakah ada atau tidak 
        if (!token) {
            
            throw new Error("Token tidak ditemukan di header");
        }

        // Masukkan token ke blacklist atau simpan status logout
        TokenBlackList.create(token);

        // mengembalikan response message
        return { message: "Logout berhasil" };
    }
}

module.exports = UserService;
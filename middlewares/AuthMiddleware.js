// // memanggil fungsi jwt untuk mengurus json web token yang akan dikirim ketika register ataupun login
// const jwt = require("jsonwebtoken");

// class AuthMiddleware {
//     static authenticate(request, response, next) {
//         // mengambil request header
//         const authHeader = request.headers.authorization;

//          // mengecek data header
//         if (!authHeader) {
//             return response.status(401).json({ error: "Token tidak ditemukan" });
//         }

//         // mengambil token dari header
//         const token = authHeader.split(" ")[1];

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             request.user = decoded;
//             next();
//         } catch (error) {
//             return response.status(401).json({ error: "Token tidak valid atau expired" });
//         }
//     }
// }

// module.exports = AuthMiddleware
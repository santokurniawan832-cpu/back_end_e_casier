// import crypto
const crypto = require("crypto");

// membuat fungsi createSignature yang bisa diexport
function createSignature(data) {
    return crypto.createHmac("sha256", process.env.APP_SIGNATURE_SECRET)
        .update(JSON.stringify(data))
        .digest("hex");
}

// melakukan exports untuk digunakan difile lain
module.exports = createSignature
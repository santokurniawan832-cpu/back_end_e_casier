/* 
    penyimpan token didalam variable tidak efesien
    harapan kedepan bisa dikembangkan, karna 
    mungkin bila server start, user yang
    sudah logout bisa masuk kembali
    tanpa login dan pengecekan
    data lewat middleware
*/

class TokenBlackList {
    // membuat variable array untuk menampung token
    static tempBlackList = []

    // membuat fungsi add untuk menabahkan token kedalam array
    static create(token) {
        this.tempBlackList.push(token);
    }

    static exists(token) {
        return this.tempBlackList.includes(token);
    }
}

module.exports = TokenBlackList;
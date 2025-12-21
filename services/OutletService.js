// memanggil class Model Outlet
const { Outlet, User } = require("../models");

// membuat class OutletService

class OutletService {

    // membuat method create yang bersifat static
    static async create({name, userId}) {
      
        const outletExist = await Outlet.findOne({ where: { name, user_id: userId } }) 
        console.log('data role', roleExist)
        if (outletExist) {
             throw new Error("Nama Jabatan sudah ada..");
        }
        // create data role
        const outlet = await Outlet.create({ name, userId: userId });

        // mengembalikan nilai role
        return {
             outlet: {
                id: outlet.id,
                name: outlet.name,
                user_id: outlet.userId
            },
        };
    }
}

// melakukan export untuk bisa digunakan diclass lain
module.exports = OutletService
// memanggil class Model Role
const { Role, AdditionRole } = require("../models");
class RoleService {
    // fungsi melakukan register
    static async store({ name }) { 
        
        // mengambil data nama role hanya 1 
        const roleExist = await Role.findOne({ where: { name } }) 
        console.log('data role', roleExist)
        if (roleExist) {
             throw new Error("Nama Jabatan sudah ada..");
        }
        // create data role
        const role = await Role.create({ name });

        // mengembalikan nilai role
        return {
             role: {
                id: role.id,
                name: role.name,
            },
        };
    }

    static async all() {
        // mengambil seluruh data beserta data relasi 
         const listAdditionRole = await Role.findAll({
            attributes: ['id', 'name'],
            include: { model: AdditionRole, as: 'additionRoles'},
            required: true
        }) 

        // mengembalikan data berbetuk array
        return {
            roles: listAdditionRole
        }
    }
}

module.exports = RoleService;
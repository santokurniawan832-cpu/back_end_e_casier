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

    static async findBy(roleId) {
        if(!roleId) {
            throw Error("data role id tidak ditemukan.." + roleId)
        }
        // mengambil data role by id melalui ORM
        const role = await Role.findByPk(roleId)

        console.log(roleId)
        // mengecek data role
        if(!role) {
            throw Error("role tidak ditemukand..")
        }
        return {
            role: role
        }
    }

    static async findAdditionRoleBy(roleId) {
        try {
            // mengecek jika tidak ada role id yang dikirim
            if(!roleId) {
                throw Error("data role id tidak ditemukan.." + roleId)
            }   

            // mengambil seluruh data additionRole berasarkan roleId
            const listAddition = AdditionRole.findAll({ where: {  role_id: roleId }  })
        } catch (error) {
            console.log('error', error)
        }
    }
}

module.exports = RoleService;
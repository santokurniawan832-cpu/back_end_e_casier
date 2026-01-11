// memanggil class Model Role
const {AdditionRole, Role} = require("../models");

class AdditionRoleService {
    // fungsi melakukan simpan data baru
    static async store({ name, role_id }) { 
        
        // mengambil data nama role hanya 1 
        const additionRoleExist = await AdditionRole.findOne({ where: { name } }) 
        if (additionRoleExist) {
             throw new Error("Nama Jabatan sudah ada..");
        }
        // create data role
        const additionRole = await AdditionRole.create({ name, role_id });

        // mengembalikan nilai additionRole
        return {
             additionRole: {
                id: additionRole.id,
                name: additionRole.name,
                role_id: additionRole.role_id
            },
        };
    }

    // fungsi melakukan update data lama
    static async update(additionRole_id, { name, role_id }) {
        // mengambil data nama role hanya 1 
        const additionRole = await AdditionRole.findByPk(additionRole_id); 

        // mengecek jika tidak ada additionRole
        if (!additionRole) {
            throw new Error("NOT_FOUND");
        }

        if (role_id !== undefined && role_id !== null) {
        const roleExist = await Role.findByPk(role_id);
            if (!roleExist) {
                throw new Error("ROLE_NOT_FOUND");
            }
        }

        await additionRole.update({ name, role_id })

        // mengembalikan data objek AdditionRole
        return {
            additionRole: {
                id: additionRole.id,
                name: additionRole.name,
                role_id: additionRole.role_id
            }
        }
    }

    // fungsi mengambil seluruh data addition role beserta dengan relasinya
    static async all() {
         // mengambil seluruh data addition role 
        const listAdditionRole = await AdditionRole.findAll({
            attributes: ['id', 'name','role_id'],
            limit: 10,
            include: { model: Role, as: 'role'}
        }) 

        // mengembalikan seluruh data additionRole berbentuk array       
        return { additionrole: listAdditionRole }
    }

    // fungsi melakukan pengambilan 1 data berdasarkan id
    static async findBy(additionRole_id) {
         // mengambil data nama aditionRole berdasarkan id
        const additionRoleExist = await AdditionRole.findByPk(additionRole_id, {
            attributes: ['id', 'name', 'role_id'],
            include: {
                model: Role,
                as: 'role',
                attributes: ['id', 'name']
            }
        }); 

        // mengecek jika tidak ada additionRole
        if(!additionRoleExist) {
            throw new Error("NOT_FOUND");
        }

        // mengembalikan data berbentuk objek
        return { additionRole: additionRoleExist }
    }

    // fungsi melakukan penghapusan data 
    static async destroy(additionRole_id) {
        // mengambil data nama role hanya 1 
        const additionRole = await AdditionRole.findByPk(additionRole_id); 

        // mengecek jika tidak ada additionRole
        if (!additionRole) {
            throw new Error("NOT_FOUND");
        }

        // melakukan penghapus data
        await additionRole.destroy()

        return true
    }
}

module.exports = AdditionRoleService;
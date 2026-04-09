// memanggil RoleService untuk  menggunakan fungsi store
const RoleService = require("../services/RoleService")

class RoleController {
    // fungsi untuk melakukan login user
    static async storeData(req, res) {
        try {
            const { name } = req.body;
            
            const role = await RoleService.store({name});
            res.json({
                message: "created role successfully",
                data: role
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // fungsi untuk mengambil seluruh data role
    static async index(request, response) {
        try {
            // menggunakan fungsi all dari RoleService
            const listRole = await RoleService.all()

            // mengembalikan data berbentuk response
            response.status(200).json({
                message: 'get roles successfully',
                data: listRole.roles
            })
        } catch (error) {
            response.status(500).json(error.message)
        }
    }

    static async getRoleById(request, response) {
        try {
            // mengambil data request untuk mengambil parameter
            const { id } = request.params

            // menemukan data role berdasarkan roleId
            const role = await RoleService.findBy(id)
            
            // mengembalikan data role
            return response.status(200).json({
                message: true,
                data: role,
            })
        } catch(error){
            response.status(404).json({
                success: false,
                message: error.message,
            })
        }
    }
}

module.exports = RoleController;
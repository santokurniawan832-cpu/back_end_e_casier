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
}

module.exports = RoleController;
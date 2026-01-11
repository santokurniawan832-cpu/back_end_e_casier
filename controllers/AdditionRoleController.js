// memanggil RoleService untuk  menggunakan fungsi store
const AdditionRoleService = require('../services/AdditionRoleService')

class AdditionRoleController {
    // fungsi untuk melakukan login user
    static async storeData(req, res) {
        try {
            const { name, role_id } = req.body;
            
            const additionRole = await AdditionRoleService.store({name, role_id});
            res.json({
                message: "created role successfully",
                data: additionRole
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAdditionRoleBy(request, response) {
        try {
            // mengambil data dari parameter 
            const { id } = request.params
            
            const additionRole = await AdditionRoleService.findBy(id);
            response.json({
                message: "created role successfully",
                data: additionRole
            });
        } catch (error) {
            // cek jika id tidak ditemukan berdasarkan pesan error dari AdditionRoleService 
            if(error.message == "NOT_FOUND") {
                response.status(404).json({
                    error: "Jabatan tambahan tidak ditemukan"
                });
            }
            response.status(500).json({ error: error.message });
        }
    }

    static async index(request, response) {
         try {
            // menggunakan fungsi all dari AdditionService
            const additionRole = await AdditionRoleService.all();
            response.json({
                message: "get list addition role successfully",
                data: additionRole
            });
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }

    static async updateData(request, response) {
        try {
            // mengambil data yang dikirim melalui parameter
            const { id } = request.params
            // mengambil seluruh data melalui request body dari json
            const { name, role_id } = request.body;

            // menggunakan fungsi update dari AdditionRoleService
            const newAdditionRole = await AdditionRoleService.update(id, {name, role_id})

            // mengembalikan response beserta data berbentuk objek 
            response.status(200).json({
                message: "updated data successfully",
                data: newAdditionRole
            });

        } catch (error) {
            if (error.message === "NOT_FOUND") {
                return response.status(404).json({
                    error: "Jabatan tambahan tidak ditemukan"
                });
            }

            if (error.message === "ROLE_NOT_FOUND") {
                return response.status(400).json({
                    error: "Jabatan utama tidak ditemukan"
                });
            }

            response.status(500).json({ error: error.message });
        }
    }

    static async delete(request, response) {
        try {
            // mengambil data dari parameter 
            const { id } = request.params
            
            // mengambil 1 data addition role
            await AdditionRoleService.destroy(id);

            // mengembalikan response 
            response.status(200).json({
                message: "deleted data successfully",
            });

        }catch(error) {
            if (error.message === "NOT_FOUND") {
                return response.status(404).json({
                    error: "Jabatan tambahan tidak ditemukan"
                });
            }

            response.status(500).json({ error: error.message });
        }
    }
}

module.exports = AdditionRoleController;
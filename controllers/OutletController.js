const OutletService = require('../services/OutletService')

class OutletController {

    // fungsi untuk membuat outlet toko
    static async storeData(request, response) {
        try {
            const {name, userId } = request.body
            const outlet = await OutletService.create(name. userId)

            // mengembalikan nilai berbentuk response json
            return response.json({
                message: 'outlet created successfully',
                data: outlet
            })
        } catch (error) {
            // mengembalikan response error
             response.status(400).json({ error: error.message });
        }
    }
}

module.exports = OutletController
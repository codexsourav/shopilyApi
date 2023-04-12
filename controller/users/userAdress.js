const Adress = require('../../model/userAdressSchema');

module.exports = {
    // get user adress 
    getAddress: async (req, res) => {
        try {
            const userId = req.authUser.id;
            const resp = await Adress.findOne({ userId });
            res.send(resp);
        } catch (error) {
            res.send({ "error": "Internal Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    },
    // update and add new address 
    updateAddress: async (req, res) => {
        try {
            const { name, mobile, addr1, addr2, city, pincode, state } = req.body;
            if (!name, !mobile, !addr1, !city, !pincode, !state) {
                res.send({ 'error': "Invalid Request / Please Add Required Data" });
                return false;
            }
            const userId = req.authUser.id;
            const resp = await Adress.findOneAndUpdate({ userId }, { userId, name, mobile, addr1, addr2, city, pincode, state }, {
                new: true,
                upsert: true,

            });
            res.send({ "success": true, "response": resp });
        } catch (error) {
            res.send({ "error": "Internal Server Error" });
            console.log("Error", error.message);
            console.log("Error", error.name);
            console.log("Error", error.stack);
        }
    }


}
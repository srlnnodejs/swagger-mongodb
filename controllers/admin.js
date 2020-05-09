const Admins = require('../models/Admins');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

class Controller {
    async getAllAdmin(req, res) {
        res.status(200).send (await Admins.find())
    }

    async getAdmin(req, res) {
        const admin = await Admins.findById(req.params.id)
        res.status(200).send(admin)
    }

    async addAdmin(req, res) {
        const Admin = new Admins({
            name: req.body.name,
            phoneno: req.body.phoneno,
            address:req.body.address
        })
        await Admin.save()
        res.status(201).send(Admin)
    }

    async updateAdmin(req, res) {
        const updQuery = {};
        if(req.body.name) {
            updQuery.name = req.body.name
        }
        if(req.body.phoneno) {
            updQuery.phoneno = req.body.phoneno
        }
        if(req.body.address) {
            updQuery.address = req.body.address
        }
        const updateAdmin = await Admins.findOneAndUpdate(
            {_id: req.params.id}, 
            updQuery,
            {new: true}
        )
        res.status(201).send(updateAdmin)
    }

    async deleteAdmin(req, res) {
        const deletedAdmin = await Admins.deleteOne({
            _id: req.params.id
        })
        res.status(200).send(deletedAdmin)
    }


}

module.exports = Controller;
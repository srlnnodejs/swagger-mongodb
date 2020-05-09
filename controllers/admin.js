const Admins = require('../models/Admin');
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
            title: req.body.title,
            description: req.body.description
        })
        await Admin.save()
        res.status(201).send(Admin)
    }

    async updateAdmin(req, res) {
        const updQuery = {};
        if(req.body.title) {
            updQuery.title = req.body.title
        }
        if(req.body.description) {
            updQuery.description = req.body.description
        }
        const updateAdmin = await Admins.findOneAndUpdate(
            {_id: req.params.id}, 
            updQuery,
            {new: true}
        )
        res.status(201).send(updateAdmin)
    }

    async deleteAdmin(req, res) {
        const deletedAdmin = await Leagues.deleteOne({
            _id: req.params.id
        })
        res.status(200).send(deletedAdmin)
    }


}

module.exports = Controller;
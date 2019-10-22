const Races = require('../models/Races')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

class Controller {

    async getAllRaces(req, res) {
        res.status(200).send(await Races.find())
    }

    async getRace(req, res) {
        const targetRace = await Races.findById(req.params.id)
        res.status(200).send(targetRace)
    }

    async addRace(req, res) {
        const race = new Races({
            title: req.body.title,
            description: req.body.description,
            time: req.body.time,
            stage: req.body.stage,
            user: req.body.user
        })
        await race.save()
        res.status(201).send(race)
    }

    async updateRace(req, res) {
        const updQuery = {};
        if(req.body.title) {
            updQuery.title = req.body.title
        }
        if(req.body.description) {
            updQuery.description = req.body.description
        }
        if(req.body.time) {
            updQuery.time = req.body.time
        }
        if(req.body.stage) {
            updQuery.stage = req.body.stage
        }
        if(req.body.user) {
            updQuery.user = req.body.user
        }
        
        const updRace = await Races.findOneAndUpdate(
            {_id: req.params.id}, 
            updQuery,
            {new: true}
        )
            res.status(201).send(updRace)
    }

    async deleteRace(req, res) {
        const targetRace = await Races.deleteOne({
            _id: req.params.id
        })
        res.status(200).send(targetRace)
    }
}

module.exports = Controller;
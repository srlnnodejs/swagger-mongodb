const Leagues = require('../models/Leagues')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

class Controller {

    async getAllLeagues(req, res) {
        res.status(200).send (await Leagues.find())
    }

    async getLeague(req, res) {
        const targetLeague = await Leagues.findById(req.params.id)
        res.status(200).send(targetLeague)
    }

    async addLeague(req, res) {
        const league = new Leagues({
            title: req.body.title,
            description: req.body.description
        })
        await league.save()
        res.status(201).send(league)
    }

    async updateLeague(req, res) {
        const updQuery = {};
        if(req.body.title) {
            updQuery.title = req.body.title
        }
        if(req.body.description) {
            updQuery.description = req.body.description
        }
        const updLeague = await Leagues.findOneAndUpdate(
            {_id: req.params.id}, 
            updQuery,
            {new: true}
        )
        res.status(201).send(updLeague)
    }

    async deleteLeague(req, res) {
        const targetLeague = await Leagues.deleteOne({
            _id: req.params.id
        })
        res.status(200).send(targetLeague)
    }

    async appendUserToLeague(req, res) {
        //find league and add user
        const targetLeague = await Leagues.findById(req.params.id);
        const usersArray = targetLeague.users;
        usersArray.push(mongoose.Types.ObjectId(req.body.userId))

        //update league
        const updLeague = await Leagues.updateOne(
            {_id: req.params.id},
            {$set: {
                users: usersArray
            }}
        )
        res.send(updLeague)
    }
}

module.exports = Controller;
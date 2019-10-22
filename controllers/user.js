const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Users = require('../models/Users')
const Races = require('../models/Races')


class Controller {

    async getAllUsers(req, res) {
        res.status(200).send(await Users.find())
    }

    async getUser(req, res) {
        const targetUser = await Users.findById(req.params.id)
        res.status(200).send(targetUser)
    }

    async addUser(req, res) {    
        const user = new Users({
            name: req.body.name,
            nickname: req.body.nickname
        })
        await user.save()
        res.status(201).send(user)
    }

    async updateUser(req, res) {
       
        const updQuery = {};
        if(req.body.name) {
            updQuery.name = req.body.name
        }
        if(req.body.nickname) {
            updQuery.nickname = req.body.nickname
        }
        const updUser = await Users.findOneAndUpdate(
            {_id: req.params.id}, 
            updQuery,
            {new: true}
        )
        res.status(201).send(updUser)
    }

    async deleteUser(req, res) {
        //delete user
        const targetUser = await Users.deleteOne({
            _id: req.params.id
        })
        // delete user-races
        const userRaces = await Races.find()

            userRaces.forEach( async (race) => {
             if(race.user == req.params.id) {
                    await Races.deleteOne({
                    _id: race._id
                })
            }
        } )
        
        res.status(200).send(targetUser)
    }

    // http://localhost:3000/users/<userId>/races
    async getUserAndRaces(req, res) {
        const result = await Users.aggregate([
            { 
                $match:{ 
                    _id: mongoose.Types.ObjectId(req.params.id) 
                } 
            },
            {
                $lookup:{
                    from: "races",       
                    localField: ("_id"),   
                    foreignField: "user", 
                    as: "user-races"         
                }
            },
            { 
                $project: { 
                    "__v": false,
                    "user-races.__v": false, 
                    "user-races._id": 0,
                    "user-races.user": false
                } 
            }
        ])
        res.send(result)
    }
    // http://localhost:3000/users/<userId>/leagues
    async getUserAndLeagues (req, res) {
        const result = await Users.aggregate([
            { 
                $match: { 
                    _id: mongoose.Types.ObjectId(req.params.id) 
                } 
            },
            {
                $lookup:{
                    from: "leagues",       
                    localField: "_id",   
                    foreignField: "users", 
                    as: "user-leagues"         
                }
            },
            { 
                $project: { 
                    "__v": false,
                    "user-leagues.__v": false, 
                    "user-leagues._id": 0 
                } 
            }
        ])
        res.send(result)
    }
}

module.exports = Controller;
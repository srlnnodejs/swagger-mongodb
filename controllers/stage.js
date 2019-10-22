const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Stages = require('../models/Stages')

class Controller {
    async getAllStages(req, res) {
        res.send(await Stages.find())
    }
   
    async getStage(req, res) {
        const targetStage = await Stages.findById(req.params.id)
        res.status(200).send(targetStage)
    }
    async addStage(req, res) {
        const stage = new Stages({
            title: req.body.title,
            description: req.body.description,
            league: req.body.league
        })
        await stage.save()
        res.status(201).send(await stage)
    }

    async updateStage(req, res) {
        const updQuery = {};
        if(req.body.title) {
            updQuery.title = req.body.title
        }
        if(req.body.description) {
            updQuery.description = req.body.description
        }
        if(req.body.league) {
            updQuery.league = req.body.league
        }
        const updStage = await Stages.findOneAndUpdate(
            {_id: req.params.id}, 
            updQuery,
            {new: true}
        )
        res.status(201).send(updStage)
    }

    async deleteStage(req, res) {
        const targetStage = await Stages.deleteOne({
            _id: req.params.id
        })
        res.status(200).send(targetStage)
    }

    //http://localhost:3000/stages/<id of stage>/races
    async getStageAndRaces(req, res) {
        const result = await Stages.aggregate([
            { 
                $match: { 
                    _id: mongoose.Types.ObjectId(req.params.id) 
                } 
            },
            {
                $lookup: {
                    from: "races",       
                    localField: "_id",   
                    foreignField: "stage", 
                    as: "stage-races"         
                }
            },
            { 
                $project: { 
                    "__v": false,
                    "stage-races.__v": false, 
                    "stage-races._id": 0 
                } 
            } 
        ])
        res.send(result)
    }
}

module.exports = Controller;
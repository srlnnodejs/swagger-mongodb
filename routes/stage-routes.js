const express = require('express');
const router = express.Router();
const Controller = require('../controllers/stage');

const controller = new Controller;

router.get('/', controller.getAllStages)
router.get('/:id', controller.getStage)
router.post('/', controller.addStage)
router.put('/:id', controller.updateStage)
router.delete('/:id', controller.deleteStage)
router.get('/:id/races', controller.getStageAndRaces)

module.exports = router;
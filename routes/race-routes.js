const express = require('express');
const router = express.Router();
const Controller = require('../controllers/race');

const controller = new Controller;

router.get('/', controller.getAllRaces)
router.get('/:id', controller.getRace)
router.post('/', controller.addRace)
router.put('/:id', controller.updateRace)
router.delete('/:id', controller.deleteRace)

module.exports = router;
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/league');

const controller = new Controller;

router.get('/', controller.getAllLeagues)
router.get('/:id', controller.getLeague)
router.post('/', controller.addLeague)
router.put('/:id', controller.updateLeague)
router.post('/:id',controller.appendUserToLeague)
router.delete('/:id', controller.deleteLeague)

module.exports = router;
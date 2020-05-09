const express = require('express');
const router = express.Router();
const Controller = require('../controllers/admin');

const controller = new Controller;

router.get('/', controller.getAllAdmin)
router.get('/:id', controller.getAdmin)
router.post('/', controller.addAdmin)
router.put('/:id', controller.updateAdmin)
router.delete('/:id', controller.deleteAdmin)
//router.get('/:id/races', controller.getUserAndRaces)
//router.get('/:id/leagues', controller.getUserAndLeagues)

module.exports = router;
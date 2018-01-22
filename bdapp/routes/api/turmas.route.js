var express = require('express')
var router = express.Router()

var TurmaController = require('../../controllers/turmas.controller');

//map each API to the controller function

router.get('/', TurmaController.getTurmas)
router.post('/', TurmaController.createTurma)
router.put('/', TurmaController.updateTurma)
router.delete('/:id', TurmaController.removeTurma)

//Export Router
module.exports = router;
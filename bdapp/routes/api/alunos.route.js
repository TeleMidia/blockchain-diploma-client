var express = require('express')
var router = express.Router()

var AlunoController = require('../../controllers/alunos.controller');

//map each API to the controller function

router.get('/', AlunoController.getAlunos)
router.post('/', AlunoController.createAluno)
//router.put('/', AlunoController.updaAluno)
router.delete('/:id', AlunoController.removeAluno)

//Export Router
module.exports = router;
var express = require('express')

var router = express.Router()
var alunos = require('./api/alunos.route')
var turmas = require('./api/turmas.route')


router.use('/alunos', alunos);
router.use('/turmas', turmas);

module.exports = router;
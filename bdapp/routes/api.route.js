var express = require('express')

var router = express.Router()
var alunos = require('./api/alunos.route')


router.use('/alunos', alunos);


module.exports = router;
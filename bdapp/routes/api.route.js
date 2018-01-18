var express = require('express')

var router = express.Router()
var todos = require('./api/alunos.route')


router.use('/alunos', alunos);


module.exports = router;
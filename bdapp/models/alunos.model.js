var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var AlunoSchema = new mongoose.Schema({
    matricula: Number,
    nome: String,
    turma: String,
    paglivro: Number,
    statusreq: Number
})

AlunoSchema.plugin(mongoosePaginate)
const Aluno = mongoose.model('Aluno', AlunoSchema)

module.exports = Aluno;
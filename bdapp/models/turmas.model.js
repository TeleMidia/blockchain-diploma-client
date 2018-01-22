var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var TurmaSchema = new mongoose.Schema({
    curso: string,
    pagelivro: number,
    status: number
    //listaAlunos: Aluno[]
})

TurmaSchema.plugin(mongoosePaginate)
const Turma = mongoose.model('Turma', TurmaSchema)

module.exports = Turma;
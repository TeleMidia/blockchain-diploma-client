var Aluno = require('../models/alunos.model')

_this = this

exports.getAlunos = async function name(query, page, limit) {
    
    //options setup for mongoose paginate
    var options = {
        page, 
        limit
    }

    try {
        var alunos = await Aluno.paginate(query,options)

        return alunos;
    } catch (e) {

        throw Error('error while paginating alunos')
    }
}

exports.createAluno = async function(aluno){
     // Creating a new Mongoose Object by using the new keyword
     var newAluno = new Aluno({
         matricula: aluno.matricula,
         nome: aluno.nome,
         turma: aluno.turma
     })

     try{
        //saving aluno
        var savedAluno = await newAluno.save()
        return savedAluno;
     }catch(e){
         //return error
         throw Error("Error while creating aluno")
     }
}

exports.updateAluno = async function(aluno){
    var id = aluno.id

    try{
        //Find the old aluno Object by the Id
    
        var oldAluno = await Aluno.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the aluno")
    }

    // If no old aluno Object exists return false
    if(!oldAluno){
        return false;
    }

    console.log(oldAluno)

    //Edit the aluno Object
    oldAluno.matricula = aluno.matricula
    oldAluno.nome = aluno.nome
    oldAluno.turma = aluno.turma


    console.log(oldAluno)

    try{
        var savedAluno = await oldAluno.save()
        return savedAluno;
    }catch(e){
        throw Error("And Error occured while updating the Aluno");
    }
}

exports.deleteAluno = async function(id){
    
    // Delete the Aluno
    try{
        var deleted = await Aluno.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Aluno Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Aluno")
    }
}
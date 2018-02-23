var Turma = require('../models/turmas.model')

_this = this

exports.getTurmas = async function name(query, page, limit) {
    
    //options setup for mongoose paginate
    var options = {
        page, 
        limit
    }

    try {
        var turmas = await Turma.paginate(query,options)

        return turmas;
    } catch (e) {

        throw Error('error while paginating turmas')
    }
}

exports.createTurma = async function(turma){
     // Creating a new Mongoose Object by using the new keyword
     var newTurma = new Turma({
         curso: turma.curso,
         filename: turma.filename,
         status: turma.status
     })

     try{
        //saving turma
        var savedTurma = await newTurma.save()
        return savedTurma;
     }catch(e){
         //return error
         throw Error("Error while creating turma")
     }
}

exports.updateTurma = async function(turma){
    var id = turma.id

    try{
        //Find the old turma Object by the Id
    
        var oldTurma = await Turma.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the turma")
    }

    // If no old turma Object exists return false
    if(!oldTurma){
        return false;
    }

    console.log(oldTurma)

    //Edit the turma Object
    oldTurma.curso = turma.curso
    oldTurma.filename = turma.filename
    oldTurma.status = turma.status


    console.log(oldTurma)

    try{
        var savedTurma = await oldTurma.save()
        return savedTurma;
    }catch(e){
        throw Error("And Error occured while updating the Turma");
    }
}

exports.deleteTurma = async function(id){
    
    // Delete the Turma
    try{
        var deleted = await Turma.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Turma Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Turma")
    }
}
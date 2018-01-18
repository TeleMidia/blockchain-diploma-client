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

// exports.updateTodo = async function(todo){
//     var id = todo.id

//     try{
//         //Find the old Todo Object by the Id
    
//         var oldTodo = await ToDo.findById(id);
//     }catch(e){
//         throw Error("Error occured while Finding the Todo")
//     }

//     // If no old Todo Object exists return false
//     if(!oldTodo){
//         return false;
//     }

//     console.log(oldTodo)

//     //Edit the Todo Object
//     oldTodo.title = todo.title
//     oldTodo.description = todo.description
//     oldTodo.status = todo.status


//     console.log(oldTodo)

//     try{
//         var savedTodo = await oldTodo.save()
//         return savedTodo;
//     }catch(e){
//         throw Error("And Error occured while updating the Todo");
//     }
// }

exports.deleteAluno = async function(id){
    
    // Delete the Aluno
    try{
        var deleted = await Aluno.remove({_id: Id})
        if(deleted.result.n === 0){
            throw Error("Todo Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}
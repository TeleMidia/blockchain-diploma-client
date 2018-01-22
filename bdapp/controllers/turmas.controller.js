// Accessing the Service that we just created
var TurmaService = require('../services/turma.service')

_this = this

exports.getTurmas = async function name(req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 

    try {
        var turmas = await TurmaService.getTurmas({},page,limit)
    
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: turmas, message: "Succesfully Received Turmas"});
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createTurma = async function(req, res, next){
    var turma = {
        curso: req.body.curso,
        pagelivro: req.body.pagelivro,
        status: req.body.status
    }

    try{
        var createTurma = await TurmaService.createTurma(turma)
        return res.status(201).json({status: 201, data: createdTurma, message: "Succesfully Created Turma"})
    }catch(e){
    
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Turma Creation was Unsuccesfull"})
    }
} 

exports.updateTurma = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "turma ID must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var turma = {
        id,
        curso: req.body.curso ? req.body.curso : null,
        pagelivro: req.body.pagelivro ? req.body.pagelivro : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedTurma = await TurmaService.updateTurma(turma)
        return res.status(200).json({status: 200, data: updatedTurma, message: "Succesfully Updated Turma"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTurma = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await TurmaService.deleteTurma(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Turma"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}
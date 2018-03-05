// Accessing the Service that we just created
var AlunoService = require('../services/aluno.service')

_this = this

exports.getAlunos = async function name(req, res, next) {

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100; 

    try {
        var alunos = await AlunoService.getAlunos({},page,limit)
    
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: alunos, message: "Succesfully Received Alunos"});
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createAluno = async function(req, res, next){
    var aluno = {
        matricula: req.body.matricula,
        nome: req.body.nome,
        turma: req.body.turma,
        paglivro: req.body.paglivro,
        statusreq: req.body.statusreq
    }

    try{
        var createAluno = await AlunoService.createAluno(aluno)
        return res.status(201).json({status: 201, data: createdAluno, message: "Succesfully Created Aluno"})
    }catch(e){
    
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Aluno Creation was Unsuccesfull"})
    }
} 

exports.updateAluno = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Matricula must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var aluno = {
        id,
        matricula: req.body.matricula ? req.body.matricula : null,
        nome: req.body.nome ? req.body.nome : null,
        turma: req.body.turma ? req.body.turma : null,
        paglivro: req.body.paglivro ? req.body.paglivro : null,
        statusreq: req.body.statusreq ? req.body.statusreq : null 
    }

    try{
        var updatedAluno = await AlunoService.updateAluno(aluno)
        return res.status(200).json({status: 200, data: updatedAluno, message: "Succesfully Updated Aluno"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeAluno = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await AlunoService.deleteAluno(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Aluno"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}
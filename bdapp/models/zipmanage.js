var JSZip = require("jszip");
var fs = require("fs");
var request = require('request');
const https = require('https');
var AlunoService = require('../services/aluno.service');
var Aluno = require('../models/alunos.model');
var TurmaService = require('../services/turma.service');
var Turma = require('../models/alunos.model');
var filePath = "../angular-rap-pucrio/src/assets/uploads/";

const URL_AUTHENTICATION_SERVER = 'http://150.165.138.252:8050/authenticate';
const URL_REGISTER_SERVER = 'http://150.165.138.252:8050/register';
const URL_SEARCH_SERVER = 'http://150.165.138.252:8050/search';
const CLIENT_ID = 'PUCRIO';

async function checkInProgressTurms(){
    console.log ("checkInProgressTurms");
    // check if registered are already completed
    var turmas = await TurmaService.getTurmas({}, 1, 100);
    var alunos = await AlunoService.getAlunos({}, 1, 100);

    turmas.docs.forEach(async function(verturma,verindext){
        if(verturma.status==1){
            var bool_turmadone = 1; //with no aluno left will be kept 1
            alunos.docs.forEach(async function(veraluno,verindexa){
                if(veraluno.statusreq == 0){
                    bool_turmadone = 0;
                    console.log("verificando" , veraluno, verindexa);
                    requestSettings = {
                        method : 'POST',
                        headers: {
                            'content-type' : 'multipart/form-data'
                        },
                        url : URL_SEARCH_SERVER,
                        timeout: 20000,
                        formData: {
                            "doc_type":'document',
                            "your_number": veraluno.matricula,
                            "client_id": CLIENT_ID
                        }
                    }
                    request(requestSettings, async function(error,request,response){
                        console.log(JSON.parse(response));
                        console.log(JSON.parse(response)[0].UUID);
                        if ((JSON.parse(response)[0].status) == "COMPLETE"){
                            console.log(console.log(veraluno.nome),"cadastrado")
                            var aluno = veraluno;
                            aluno.statusreq = 1;
                            var updatedAluno = await AlunoService.updateAluno(aluno);
                        }
                        else{
                            ;
                        }

                    });
                }
            });
            if(bool_turmadone == 1){
                var turma = verturma;
                turma.status = 3;
                var updatedTurma = await TurmaService.updateTurma(turma);
            }
        }
        else{
            ;
        }
    });
}

(function doverification(){
    console.log ("doverification");
    // check if server is ok
    request.get(URL_SEARCH_SERVER, {timeout: 2000}, function(err,request,response) {
        console.log ("checkServer error=", err);
        console.log ("checkServer response=", response);
        // if (err.code != 'ETIMEDOUT' && err.code != 'ECONNREFUSED' && err.code != 'ESOCKETTIMEDOUT' )
        if (err == null && response.code != 2007)
            checkInProgressTurms ();
    });
    setTimeout(doverification, 100000);
})();


exports.create = function (turma) {
    console.log('[create] says:CREATED', turma.curso, turma.filename);
}

exports.manage = function (turma) {

    console.log('[update] says:MODIFIED', turma.curso, turma.filename);
    if (turma.filename != null) {
        fs.readFile(filePath + turma.filename, async function (err, data) {
            if (err) throw err;
            var zip = new JSZip();
            zip.loadAsync(data).then(function (contents) {
                console.log('zip da turma achado', turma.curso, turma.filename);
                Object.keys(contents.files).forEach(function (filename) {
                    console.log('arquivo no zip:', filename);
                    zip.files[filename].async('nodebuffer').then(function (content) {
                        //creating folder
                        if (!fs.existsSync(filePath + turma.curso)) {
                            fs.mkdirSync(filePath + turma.curso);
                        }
                        //
                        var dest = filePath + turma.curso + '/' + filename;
                        fs.writeFileSync(dest, content);
                    });
                });
            });

            // try{
            var alunos = await AlunoService.getAlunos({}, 1, 100);
            console.log('pegou alunos');
            // console.log(alunos);
            console.log(alunos.docs);
            // }catch(e){

            // }

            alunos.docs.forEach(function send(alunotemp) {
                if (alunotemp.turma == turma.curso) {
                    console.log(alunotemp.turma);
                    var dest = filePath + turma.curso + '/' + alunotemp.matricula +".pdf" ;
                    console.log("arquivo em" , dest);
                    requestSettings = {
                        method : 'POST',
                        headers: {
                            'content-type' : 'multipart/form-data'
                        },
                        url : URL_REGISTER_SERVER,
                        timeout: 20000,
                        formData: {
                            file: fs.createReadStream(dest),
                            doc_type:'document',
                            dlt_id: 'ethereum',
                            your_number: alunotemp.matricula,
                            client_id: CLIENT_ID
                        }
                    }
                    request(requestSettings, function(error,request,response){
                        console.log(response,error);
                        if (response==""){
                            console.log("SENT TO UPLOAD:",alunotemp);
                            //alunosaverificar.push(alunotemp);
                            //change register status
                        }
                        else{
                            //TODO: CHECK ERROR 3006(DUPLICATED)
                            console.log("WILL TRY TO UPLOAD AGAIN");
                            // alunosretryupload.push(alunotemp);
                            setTimeout(send.bind(null, alunotemp), 10000);
                        }
                    });

                }
            })
        });

    }
}

var JSZip = require("jszip");
var fs = require("fs");
var request = require('request');
const https = require('https');
var AlunoController = require('../controllers/alunos.controller');
var filePath = "../angular-rap-pucrio/src/assets/uploads/";

exports.create = function(turma){
    console.log('[create] says:CREATED', turma.curso, turma.filename);
}

exports.manage = function(turma){
    var request = new XMLHttpRequest();
    console.log('[update] says:MODIFIED', turma.curso, turma.filename);
    if (turma.filename != null)
    {
        //var zip = new JSZip();
        //zip.file("Hello.txt", "Hello World\n");
        //var testefolder = zip.file("/../angular-rap-pucrio/src/assets/uploads");
        //var testefolder = zip.file("teste");
        //testefolder.file("README", "a folder");
        
        // fs.readFile("test.zip", function(err, data) {
        //     if (err) throw err;
        //     JSZip.loadAsync(data).then(function (zip) {
        //         console.log('teste.zip achado');
        //     });
        // });

        fs.readFile(filePath+turma.filename, function(err, data) {
            if (err) throw err;
            var zip = new JSZip();
            zip.loadAsync(data).then(function (contents) {
                console.log('zip da turma achado', turma.curso, turma.filename);
                Object.keys(contents.files).forEach(function(filename){
                    console.log('arquivo no zip:', filename);
                    zip.files[filename].async('nodebuffer').then(function(content) {
                    //creating folder
                    if (!fs.existsSync(filePath + turma.curso)){
                        fs.mkdirSync(filePath + turma.curso);
                    }
                    //
                    var dest = filePath + turma.curso + '/' + filename;
                    fs.writeFileSync(dest, content);
                    });
                });
            });// unzip

            // var alunos = getAlunos();
            // alunos.forEach(function (alunotemp){
            //     if (alunotemp.turma == turma.curso)
            //     {
                    
            //     }
            // })
        });

    }
}
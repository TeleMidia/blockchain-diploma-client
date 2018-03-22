import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { TurmaService } from '../services/turma.service';
import Aluno from '../models/aluno.model';
import Turma from '../models/turma.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Response } from '@angular/http';
//import * as fs from 'fs';

@Component({
    selector: 'app-bd-screen',
    templateUrl: './bd-screen.component.html',
    encapsulation: ViewEncapsulation.None
  })
export class BdScreenComponent implements OnInit {
  
  constructor(public dialog: MatDialog, private alunoService: AlunoService, private turmaService: TurmaService) { }
  
  public newAluno: Aluno = new Aluno()
  alunosList: Aluno[];
  editAlunos: Aluno[] = [];

  public newTurma: Turma = new Turma()
  turmasList: Turma[];
  turmasinprocessList: Turma[];
  turmascompleteList: Turma[];
  editTurmas: Turma[] = [];


  ngOnInit() {
    this.reloadpage()
  }

  create() {
      this.alunoService.createAluno(this.newAluno)
        .subscribe((res) => {
          this.alunosList.push(res.data)
          this.newAluno = new Aluno()
        })
    //this.reloadpage()
  }

  createT() {
    this.turmaService.createTurma(this.newTurma)
      .subscribe((res) => {
        this.turmasList.push(res.data)
        this.newTurma = new Turma()
      })
    //this.reloadpage() 
    
  }


  editAluno(aluno: Aluno) {
    console.log(aluno)
    if(this.alunosList.includes(aluno)){
      if(!this.editAlunos.includes(aluno)){
        this.editAlunos.push(aluno)
      }else{
        this.editAlunos.splice(this.editAlunos.indexOf(aluno), 1)
        this.alunoService.editAluno(aluno).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editAluno(aluno)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  editTurma(turma: Turma) {
    console.log(turma)
    if(this.turmasList.includes(turma)){
      if(!this.editTurmas.includes(turma)){
        this.editTurmas.push(turma)
      }else{
        this.editTurmas.splice(this.editTurmas.indexOf(turma), 1)
        this.turmaService.editTurma(turma).subscribe(res => {
          console.log('Update turma Succesful')
        }, err => {
          this.editTurma(turma)
          console.error('Update turma Unsuccesful')
        })
      }
    }
    //this.reloadpage()
  }

  doneAluno(aluno:Aluno){
      aluno.statusreq = 1 //enum?
      this.alunoService.editAluno(aluno).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editAluno(aluno)
        console.error('Update Unsuccesful')
      })
  }

  doneTurma(turma:Turma , filename:string){
    console.log("saved filename:",turma.filename)
    turma.status = 1//turma.status+1 //starts at 0,1 is in process 2 is concluded
    turma.filename = filename
    console.log("new filename:",turma.filename)
    this.turmaService.editTurma(turma).subscribe(res => {
      console.log('Update turma Succesful')
    }, err => {
      this.editTurma(turma)
      console.error('Update turma Unsuccesful')
    })
    
    this.alunosList.forEach( function (alunotemp){
      if (alunotemp.turma == turma.curso)
      {
        this.doneAluno(alunotemp)
      }
    })
  }

  reloadpage()
  {
    this.alunosList = null
    this.turmasList = this.turmasinprocessList = this.turmascompleteList = null

    this.alunoService.getAlunos()
      .subscribe(alunos => {
          this.alunosList = alunos
          console.log(alunos)
      })
    this.turmaService.getTurmas()
      .subscribe(turmas => {
          this.turmasList = turmas.filter(turma => turma.status === 0)
          console.log(this.turmasList)
          console.log(turmas)
      })
      this.turmaService.getTurmas()
      .subscribe(turmas => {
          this.turmasinprocessList = turmas.filter(turma => turma.status === 1)
          console.log(this.turmasinprocessList)
      })
      this.turmaService.getTurmas()
      .subscribe(turmas => {
          this.turmascompleteList = turmas.filter(turma => turma.status === 2)
          console.log(this.turmascompleteList)
      })
  }
  // submitAluno(event, aluno:Aluno){
  //     if(event.keyCode ==13){
  //       this.editAluno(aluno)
  //     }
  // }
  
  deleteAluno(aluno: Aluno) {
      this.alunoService.deleteAluno(aluno._id).subscribe(res => {
          this.alunosList.splice(this.alunosList.indexOf(aluno), 1);
      })
  }

  openPDF(event,nomeAluno,matriculaAluno)
  {
    /*opens in dialog*/
    let dialogRef = this.dialog.open(DialogFileView, {
      //width: '300px',
      data: {
        nomePDF: nomeAluno,
        numPDF: matriculaAluno
      }
    });
  }

  openDialog(event,nomeTurma) {
    let dialogRef = this.dialog.open(DialogDataExampleDialog, {
      //width: '400px',
      data: {
        teste: 'teste',
        curso: nomeTurma,
        waitingUpload: 1,
        arquivo : '/assets/downloads/' + nomeTurma.toLowerCase().replace(".","").replace("-","") + '.zip'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result,"RETORNO DO DIALOGO");
      if (result != null)
      {
        console.log("tem sim");
        this.doneTurma(this.turmasList.find(x=>x.curso==nomeTurma),result); //change turma status
        
      }

    });
  }
}

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
  })
export class DialogDataExampleDialog {
constructor(
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(event): void {
      this.dialogRef.close();
      console.log("NO CLICK");
    }

    onYesClick(event): void {
      // if (this.result==null)
      // {  
      //   this.dialogRef.close(this.data.teste);
      // }
      // else
      this.dialogRef.close(this.data.teste);
    }

    filenameChange(event) {
      this.data.teste = event;
    }
}

@Component({
selector: 'dialog-fileview',
templateUrl: 'dialog-fileview.html',
})
export class DialogFileView {
constructor(
    public dialogRef: MatDialogRef<DialogFileView>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
}
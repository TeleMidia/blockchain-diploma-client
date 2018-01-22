import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import { TurmaService } from '../services/turma.service';
import Aluno from '../models/aluno.model';
import Turma from '../models/turma.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Response } from '@angular/http';

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
      this.alunoService.getAlunos()
      .subscribe(alunos => {
          this.alunosList = alunos
          console.log(alunos)
      })
      this.turmaService.getTurmas()
      .subscribe(turmas => {
          this.turmasList = turmas.filter(turma => turma.status === 0)
          console.log(turmas)
      })
      this.turmaService.getTurmas()
      .subscribe(turmas => {
          this.turmasinprocessList = turmas.filter(turma => turma.status === 1)
          console.log(turmas)
      })
      this.turmaService.getTurmas()
      .subscribe(turmas => {
          this.turmascompleteList = turmas.filter(turma => turma.status === 2)
          console.log(turmas)
      })
  }

  create() {
      this.alunoService.createAluno(this.newAluno)
        .subscribe((res) => {
          this.alunosList.push(res.data)
          this.newAluno = new Aluno()
        })
  }

  createT() {
    this.turmaService.createTurma(this.newTurma)
      .subscribe((res) => {
        this.turmasList.push(res.data)
        this.newTurma = new Turma()
      })
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

  doneAluno(aluno:Aluno){
      //aluno.status = 'Done'
      this.alunoService.editAluno(aluno).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editAluno(aluno)
        console.error('Update Unsuccesful')
      })
  }
  submitAluno(event, aluno:Aluno){
      if(event.keyCode ==13){
        this.editAluno(aluno)
      }
  }
  
  deleteAluno(aluno: Aluno) {
      this.alunoService.deleteAluno(aluno._id).subscribe(res => {
          this.alunosList.splice(this.alunosList.indexOf(aluno), 1);
      })
  }

  openPDF(event,nomeAluno)
  {
    /*opens in dialog*/
    let dialogRef = this.dialog.open(DialogFileView, {
      //width: '300px',
      data: {
        nomePDF: nomeAluno
      }
    });
  }

  openDialog(event,nomeTurma) {
    let dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '300px',
      data: {
        teste : 'teste'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
      console.log(result);
      if (result == 'teste')
      {
        //this.addToProcess(nomeTurma);
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

    onNoClick(): void {
    this.dialogRef.close();
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
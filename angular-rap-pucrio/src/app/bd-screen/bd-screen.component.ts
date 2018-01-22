import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AlunoService } from '../services/aluno.service';
import Aluno from '../models/aluno.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Response } from '@angular/http';

@Component({
    selector: 'app-bd-screen',
    templateUrl: './bd-screen.component.html',
    encapsulation: ViewEncapsulation.None
  })

@Component({
    selector: 'dialog-data-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
})
  export class BdScreenComponent implements OnInit {
    
    constructor(public dialog: MatDialog, private alunoService: AlunoService) { }
    
    public newAluno: Aluno = new Aluno()
    alunosList: Aluno[];
    editAlunos: Aluno[] = [];


    ngOnInit() {
        this.alunoService.getAlunos()
        .subscribe(alunos => {
            this.alunosList = alunos
            console.log(alunos)
        })
    }

    create() {
        this.alunoService.createAluno(this.newAluno)
          .subscribe((res) => {
            this.alunosList.push(res.data)
            this.newAluno = new Aluno()
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
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Aluno } from '../aluno';
import { TURMAS } from '../mock-turmas'
import { TURMASINPROCESS } from '../mock-turmas-inprocess'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SecondScreenComponent implements OnInit {
  turmas = TURMAS;
  turmasinprocess = TURMASINPROCESS;

  constructor(public dialog: MatDialog) { }//public dialog: MatDialog) { }

  ngOnInit() {
  }

  remove (nomeTurma)
  {
    //this.turmas = [] ;
  }

  addToProcess (nomeTurma)
  {
    var clickedTurma,index;
    //index = this.turmas.indexOf(nomeTurma);
    //clickedTurma = this.turmas.splice(index, 1)
    
    clickedTurma = this.turmas.pop();
    this.turmasinprocess = this.turmasinprocess.concat(clickedTurma);
  }

  clicked(event,nomeTurma) 
  {
    console.log(nomeTurma);
    this.openDialog();
    //this.addToProcess(nomeTurma);
    //this.remove(nomeTurma);
  }

  openPDF(event,nomeAluno)
  {
    /*redirects
    //window.location.href='https://previews.123rf.com/images/radub85/radub851302/radub85130200229/18128234-Blank-Diploma-Document-With-Golden-Ribbon-Isolated-On-White-Stock-Vector.jpg';*/
    window.open("https://previews.123rf.com/images/radub85/radub851302/radub85130200229/18128234-Blank-Diploma-Document-With-Golden-Ribbon-Isolated-On-White-Stock-Vector.jpg", "_blank");

  }

  openDialog() {
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
        this.addToProcess(result);
      }

    });
  }

  onYesClick() {
    
  }
  // openDialog(): void {
  //   let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

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
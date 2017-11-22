import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Aluno } from '../aluno';
import { TURMAS } from '../mock-turmas'
import { TURMASINPROCESS } from '../mock-turmas-inprocess'

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SecondScreenComponent implements OnInit {
  turmas = TURMAS;
  turmasinprocess = TURMASINPROCESS;

  constructor() { }//public dialog: MatDialog) { }

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
    //openDialog();
    this.addToProcess(nomeTurma);
    this.remove(nomeTurma);
  }

  // openDialog(): void {
  //   let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: { name: this.name, animal: this.animal }
  //   });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

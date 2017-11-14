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

  constructor() { }

  ngOnInit() {
  }

}

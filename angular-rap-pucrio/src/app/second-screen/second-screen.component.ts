import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Aluno } from '../aluno';
import { TURMAS } from '../mock-turmas'

import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecondScreenComponent implements OnInit {
  turmas = TURMAS;

  constructor() { }

  ngOnInit() {
  }

}

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
//import { SecondScreenComponent,DialogDataExampleDialog, DialogFileView} from './second-screen/second-screen.component';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { BdScreenComponent,DialogDataExampleDialog, DialogFileView } from './bd-screen/bd-screen.component';
import { FilesComponent } from './bd-screen/files-upload/files.component';

import { AlunoService } from './services/aluno.service'
import { TurmaService } from './services/turma.service'


@NgModule({
  declarations: [
    AppComponent,
    //SecondScreenComponent,
    FirstScreenComponent,
    BdScreenComponent,
    DialogDataExampleDialog,
    DialogFileView,
    FilesComponent,
    FileDropDirective, 
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogDataExampleDialog,
    DialogFileView
  ],
  providers: [
    AlunoService,
    TurmaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

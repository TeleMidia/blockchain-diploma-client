import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { SecondScreenComponent,DialogDataExampleDialog, DialogFileView} from './second-screen/second-screen.component';
import { FirstScreenComponent } from './first-screen/first-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    SecondScreenComponent,
    FirstScreenComponent,
    DialogDataExampleDialog,
    DialogFileView
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

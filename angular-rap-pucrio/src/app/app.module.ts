import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { SecondScreenComponent } from './second-screen/second-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    SecondScreenComponent,
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

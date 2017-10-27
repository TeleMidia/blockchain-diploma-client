import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppComponent }  from './app.component';
import { FirstScreen } from './first-screen.component';
import { SecondScreen } from './second-screen.component';
import { RouterModule }   from '@angular/router';



@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'first',
        component: FirstScreen
      }
    ])
   ],
  declarations: [ 
    AppComponent, 
    FirstScreen
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { Component } from '@angular/core';
import { FirstScreen } from './first-screen.component';
import { SecondScreen } from './second-screen.component';

@Component({
  selector: 'my-app',
  template: `
  <first-screen></first-screen>
  `,
})
export class AppComponent  { 
  name = 'rap-PUC'; 
  
  //mensagem = 'Digite login e senha'
}

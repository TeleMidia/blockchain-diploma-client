import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SAP PUC-Rio';
  testeIf = 'first';

  login(event){
    if(1)
    this.testeIf = 'notFirst';
  }
}

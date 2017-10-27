import { Component } from '@angular/core';

@Component({
    selector: 'first-screen',
    template: `<h1>Welcome to {{name}}</h1>
    <h2>Digite {{msg.ask1}} e {{msg.ask2}} </h2>
    <form>
    <input type="text" name="login" placeholder="login">
    <input type="password" name="password" placeholder="password">
    <input type="submit" value="Entrar" >
    </form>
    `,
  })
  export class FirstScreen  { 
    name = 'rap-PUC'; 
    msg: Msg = {
      ask1: 'login',
      ask2: 'senha'
    }
    //mensagem = 'Digite login e senha'
  }
  
  export class Msg {
    ask1: string;
    ask2: string;
  }
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var FirstScreen = (function () {
    function FirstScreen() {
        this.name = 'rap-PUC';
        this.msg = {
            ask1: 'login',
            ask2: 'senha'
        };
        //mensagem = 'Digite login e senha'
    }
    return FirstScreen;
}());
FirstScreen = __decorate([
    core_1.Component({
        selector: 'first-screen',
        template: "<h1>Welcome to {{name}}</h1>\n    <h2>Digite {{msg.ask1}} e {{msg.ask2}} </h2>\n    <form>\n    <input type=\"text\" name=\"login\" placeholder=\"login\">\n    <input type=\"password\" name=\"password\" placeholder=\"password\">\n    <input type=\"submit\" value=\"Entrar\" >\n    </form>\n    ",
    })
], FirstScreen);
exports.FirstScreen = FirstScreen;
var Msg = (function () {
    function Msg() {
    }
    return Msg;
}());
exports.Msg = Msg;
//# sourceMappingURL=first-screen.component.js.map
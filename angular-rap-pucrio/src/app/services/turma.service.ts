import Turma from '../models/turma.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';


@Injectable()
export class TurmaService {

  api_url = 'http://localhost:3000';
  turmaUrl = `${this.api_url}/api/turmas`;

  constructor(
    private http: HttpClient
  ) { }

  createTurma(turma: Turma): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.turmaUrl}`, turma);
  }

  //Read turma, takes no arguments
  getTurmas(): Observable<Turma[]>{
    return this.http.get(this.turmaUrl)
    .map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Turma[];
    })
  }
  //Update turma, takes a Turma Object as parameter
  editTurma(turma:Turma){
    let editUrl = `${this.turmaUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, turma);
  }

  deleteTurma(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.turmaUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
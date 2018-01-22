import Aluno from '../models/aluno.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';


@Injectable()
export class AlunoService {

  api_url = 'http://localhost:3000';
  alunoUrl = `${this.api_url}/api/alunos`;

  constructor(
    private http: HttpClient
  ) { }

  createAluno(aluno: Aluno): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.alunoUrl}`, aluno);
  }

  //Read aluno, takes no arguments
  getAlunos(): Observable<Aluno[]>{
    return this.http.get(this.alunoUrl)
    .map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Aluno[];
    })
  }
  //Update aluno, takes a Aluno Object as parameter
  editAluno(aluno:Aluno){
    let editUrl = `${this.alunoUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, aluno);
  }

  deleteAluno(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.alunoUrl}/${id}`
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
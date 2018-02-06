import { Component, OnInit,ElementRef,Input  } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
// const URL = '/api/';
const URLAPI = 'http://localhost:8000/';

@Component({
  selector: 'app-files-upload',
  template: `
  <br>
  Upload de arquivo:
  <div ng2FileDrop  [uploader]="uploader"  style="border: dotted">
    Arraste arquivo aqui ou selecione
    <br>
    <br>
    <input type="file" name="photo" ng2FileSelect [uploader]="uploader" />
  </div>
  <button type="button" class="btn btn-success btn-s" (click)="uploader.uploadAll()" [disabled]="!uploader.getNotUploadedItems().length">
    Upload 
  </button>
  <br>
  `,
  //templateUrl: 'files.component.html',
  //styleUrls: ['files.component.css'],
})
export class FilesComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URLAPI, itemAlias: 'photo'});
  
  ngOnInit(){
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         console.log("ImageUpload:uploaded:", item, status, response);
         alert(response);
    }
  }

  constructor(private http: Http, private el: ElementRef) {}
}
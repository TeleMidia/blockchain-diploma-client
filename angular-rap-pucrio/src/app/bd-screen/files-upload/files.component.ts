import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URLAPI = 'http://localhost:4200/';

@Component({
  selector: 'app-files-upload',
  template: `
  <br>
  Upload de arquivo:
  <div ng2FileDrop  [uploader]="uploader"  style="border: dotted">
    Arraste arquivo aqui ou selecione
    <br>
    <br>
    <input type="file" ng2FileSelect [uploader]="uploader" multiple />
  </div>
  <br>
  `,
  //templateUrl: 'files.component.html',
  //styleUrls: ['files.component.css'],
})
export class FilesComponent implements OnInit {
  uploader = new FileUploader({url: URLAPI});
  
  ngOnInit(){

  }
}
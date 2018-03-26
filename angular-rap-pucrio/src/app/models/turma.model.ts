//import Aluno from './aluno.model';

export class Turma {
    _id:string;
    curso: string;
    filename: string;
    status: number;
    downloadlink: string;
    //listaAlunos: Aluno[];

    constructor(
    ){
        this.curso = ""
        this.filename = ""
        this.status = 0
        this.downloadlink = ""
        //this.listaAlunos = null
    }

}

export default  Turma;
  
//import Aluno from './aluno.model';

export class Turma {
    _id:string;
    curso: string;
    filename: string;
    status: number;
    //listaAlunos: Aluno[];

    constructor(
    ){
        this.curso = ""
        this.filename = ""
        this.status = 0
        //this.listaAlunos = null
    }

}

export default  Turma;
  
//import Aluno from './aluno.model';

export class Turma {
    _id:string;
    curso: string;
    pagelivro: number;
    status: number;
    //listaAlunos: Aluno[];

    constructor(
    ){
        this.curso = ""
        this.pagelivro = 0
        this.status = 0
        //this.listaAlunos = null
    }

}

export default  Turma;
  
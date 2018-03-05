class Aluno {
    _id:string;
    matricula: number;
    nome: string;
    turma: string;
    paglivro: number;
    statusreq: number;

    constructor(
    ){
        this.matricula = 1000000
        this.nome = ""
        this.turma = ""
        this.paglivro = 0
        this.statusreq = 0
    }
}

export default Aluno;
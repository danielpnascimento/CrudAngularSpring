import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {

  id!: number;
  nome!: string;
  //Não e string e sim "Marca" que vem do back da classe Carro
  marca!: Marca;
  // ano!: number;
  //Toda vez que tiver lista usar uma tabela na carrodetails
  // acessorios!: Acessorio[] ;
  acessorios: Acessorio[] = [] ;

  constructor(id: number, nome: string, marca: Marca | null) {
  // constructor(id?: number, nome?: string, marca?: Marca | null) {
  // constructor(id?: number, nome?: string, marca?: Marca | null, ano?: number) {
    this.id = id;
    this.nome = nome;
    if (marca) this.marca = marca;
    // if (id) this.id = id;
    // if (nome) this.nome = nome;
    // if (marca) this.marca = marca;
    // if (ano) this.ano = ano;
  }
}

// Aula19 
// https://youtu.be/zJFVhlwdwvg?si=4iFcDP8lkbvYUzoE
// 3.53 add Marca
// 4.10 sem null
// 6.11 com null

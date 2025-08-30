import { Acessorio } from "./acessorio";
import { Marca } from "./marca";
import { Proprietario } from "./proprietario";

export class Carro {

  id!: number;
  nome!: string;
  //Não e string e sim "Marca" que vem do back da classe Carro
  marca!: Marca;
  ano!: number;
  //Toda vez que tiver lista usar uma tabela na carrodetails
  // acessorios!: Acessorio[] ;
  acessorios: Acessorio[] = [];
  proprietarios: Proprietario[] = [];

  constructor(id: number, nome: string, marca?: Marca | null) {
    this.id = id;
    this.nome = nome;
    if (marca) this.marca = marca;

  }
}


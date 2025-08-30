export class Acessorio {
  id!: number;
  nome!: string;
  quantidade!: number;

  constructor(id: number, nome: string) {
    this.id = id;
    this.nome = nome;
    // this.quantidade = quantidade;
  }
}

export class Proprietario {
  id!: number;
  nome!: string;
  idade!: number;
  cnpj!: number;

  constructor(id: number, nome: string) {
    this.id = id;
    this.nome = nome;
  }
}

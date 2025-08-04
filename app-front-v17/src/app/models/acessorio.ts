export class Acessorio {
  id!: number;
  nome!: string;
  // ano!: number;

  constructor(id: number, nome: string) {
  // constructor(id: number, nome: string, ano: number) {
    this.id = id;
    this.nome = nome;
    // this.ano = ano;
  }
}

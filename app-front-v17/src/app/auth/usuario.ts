
export class Usuario {
  slice(arg0: number) {
    throw new Error('Method not implemented.');
  }
  charAt(arg0: number) {
    throw new Error('Method not implemented.');
  }
  id!: number;
  nomeCompleto!: string;
  username!: string;
  password!: string;
  //Tipo de permissão que o usuário tem la no back!
  role!: string;
}

//Usuário que representa o user que vai ser salvo no bd

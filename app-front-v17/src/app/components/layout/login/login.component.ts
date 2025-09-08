import { LoginService } from './../../../auth/login.service';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  //Criando um usuario admin local/temporario "depois será tirado quando for usar um com
  // hash/criptografia com bd"
  //Atributos interpolados na login.Componente.html do inputs "ngModel"
  // usuario!: string;
  // senha!: string;

  //Desativamos acima e criamos o login jwt e chamamos sua classe Login da pasta auth
  // que esta interpolado com o login do html e seu metodo logar chama loginService
  // que chama token para o bd após verificar o user e senha se estão
  // corretos conforme o if e else abaixo!
  login: Login = new Login();

  //injetar a rota da pagina pós login
  router = inject(Router);

  //Usando JWT +Spring Security
  //Injetamos o objeto e chamamos sua classe após desativar
  //a estutura toda abaixo dentro do logar()
  loginService = inject(LoginService);

  //E por segurança chama o metodo removerToken para não deixar registro no
  // navegador quando sair/deslogar ele apaga!
  constructor() {
    this.loginService.removerToken();
   }

  logar() {
    // if (this.usuario == 'admin' && this.senha == 'admin') {
    // Será redirecionado para pagina carros após a injeção acima
    // this.router.navigate(['admin/carros']);

    // } else
    // alert('Usuário ou senha incorretos!');

    //Criando o login com JWT conforme a injeção acima!
    this.loginService.logar(this.login).subscribe({
      next: token => {
        //Se o usuário e senha forem corretos
        if (token) {
          this.loginService.addToken(token);
          //Adciona para rota/pagina conforme
          //seu tipo de acesso de usuário
          if(this.loginService.hasPermission("ADMIN"))
          this.router.navigate(['/admin/carros']);
        else if(this.loginService.hasPermission("USER"))
           this.router.navigate(['/admin/marcas']);
        } else {
          alert('Usuário ou senha incorretos!');
        }

      },
      error: erro => {
        alert('Erro, checar usuário e senha!');
      }
    });

  }
}

// Retirei o login temporario e deixei sem user e senha
// para poder codar sem ficar digitando eles toda hora!
// OK COM O VIDEO 24!

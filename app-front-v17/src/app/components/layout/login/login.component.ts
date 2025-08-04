import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  //Criando um usuario admin local/temporario "depois será tirado quando for usar um com hash/criptografia com bd"
  //Atributos interpolados na login.Componente.html do inputs "ngModel"
  usuario!: string;
  senha!: string;

  //injetar a rota da pagina pós login
  router = inject(Router);

  logar() {
    // if (this.usuario == 'admin' && this.senha == 'admin') {
      // Será redirecionado para pagina carros após a injeção acima
      this.router.navigate(['admin/carros']);

    // } else
      // alert('Usuário ou senha incorretos!');
  }
}

// Retirei o login temporario e deixei sem user e senha
// para poder codar sem ficar digitando eles toda hora!


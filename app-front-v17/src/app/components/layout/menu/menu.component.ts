import { Component } from '@angular/core';
// import { inject } from '@angular/core/testing';
import { inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from './../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  usuario!: Usuario;

  loginService = inject(LoginService);

  // Para o informar o login logado na tela
  constructor() {
    this.usuario = this.loginService.getUsuarioLogado();
  }
}

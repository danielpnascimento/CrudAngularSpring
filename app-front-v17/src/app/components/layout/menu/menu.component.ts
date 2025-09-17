import { Component } from '@angular/core';
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

  // Habilitando o link ativo conforme suas abas "modo Href e ñ com Angular"
  ngAfterViewInit(): void {
    const currentPath = window.location.pathname; // ex: /admin/carros
    const links = document.querySelectorAll<HTMLAnchorElement>('.navbar-nav .nav-link');

    links.forEach(link => {
      let href = link.getAttribute('href');
      if (!href) return;

      if (!href.startsWith('/')) {
        href = '/' + href;
      }

      // Marca ativo se a URL começa com o href (suporta subpáginas)
      if (currentPath.startsWith(href)) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }
}


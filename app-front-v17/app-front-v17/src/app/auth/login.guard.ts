import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);

  // Aqui nesse caso e ao contrario ele ta negando acesso ao user então vai barrar pos login, state vem do guardinha
  if (loginService.hasPermission("USER") && state.url == '/admin/carros') {
    // if (state.url == '/admin/carros' && !loginService.hasPermission('USER')) {
    alert('Você não tem permissão de acesso a essa rota!');
    // window.alert('Você não tem permissão de acesso á essa rota!');
    return false;
  }

  //Bloqueio para o admin senão ele consegue acessar
  if (loginService.hasPermission("ADMIN") && state.url == '/admin/marcas') {
    // if (state.url == '/admin/carros' && !loginService.hasPermission('USER')) {
    alert('Você não tem permissão de acesso a essa rota!');
    // window.alert('Você não tem permissão de acesso á essa rota!');
    return false;
  }

  return true;

};
// OK COM O VIDEO 24!

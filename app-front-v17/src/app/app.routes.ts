import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { MarcaslistComponent } from './components/marcas/marcaslist/marcaslist.component';
import { MarcasdetailsComponent } from './components/marcas/marcasdetails/marcasdetails.component';
import { AcessorioslistComponent } from './components/acessorios/acessorioslist/acessorioslist.component';
import { AcessoriosdetailsComponent } from './components/acessorios/acessoriosdetails/acessoriosdetails.component';
import { loginGuard } from './auth/login.guard';
import { ProprietarioslistComponent } from './components/proprietarios/proprietarioslist/proprietarioslist.component';
import { ProprietariosdetailsComponent } from './components/proprietarios/proprietariosdetails/proprietariosdetails.component';

export const routes: Routes = [
  // Redirecinamento de rotas onde se acessar a raiz
  // enviar para a tela de login
  { path: "", redirectTo: "login", pathMatch: "full" },

  // Rota da Login chama a LoginComponent e assim como na demais!
  { path: "login", component: LoginComponent },

  //Após o login na rota admin criamos/redirecionamentos para as rotas filhas
  //Onde elas receberam a tag/tela da PrincipalComponent que é uma barra de menu
  {
    // Recebemos a tela de novo ou editar e lista pelo id
    //O loginGuard na rota admin ele verificar tudo passará por ele!
    path: "admin", component: PrincipalComponent, canActivate: [loginGuard], children: [
      { path: "carros", component: CarroslistComponent },
      { path: "carros/new", component: CarrosdetailsComponent },
      { path: "carros/edit/:id", component: CarrosdetailsComponent },

      { path: "marcas", component: MarcaslistComponent },
      { path: "marcas/new", component: MarcasdetailsComponent },
      { path: "marcas/edit/:id", component: MarcasdetailsComponent },

      { path: "acessorios", component: AcessorioslistComponent },
      { path: "acessorios/new", component: AcessoriosdetailsComponent },
      { path: "acessorios/edit/:id", component: AcessoriosdetailsComponent },

      { path: "proprietarios", component: ProprietarioslistComponent },
      { path: "proprietarios/new", component: ProprietariosdetailsComponent },
      { path: "proprietarios/edit/:id", component: ProprietariosdetailsComponent },
    ]
  }
];

// Lembrando que na versão 20 do angular não criar
// mais diretorio com final component então
// e LoginComponent e não apenas Login
// OK COM O VIDEO 24!

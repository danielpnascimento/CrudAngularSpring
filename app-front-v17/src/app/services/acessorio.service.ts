import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acessorio } from '../models/acessorio';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {

  //4° passo Criar a injeção assincrona e seu import '@angular/core'
  http = inject(HttpClient);

  //Criando um variável para abreviar a rota de saida do back
  API = "http://localhost:8080/api/acessorio";

  constructor() { }

  // *******ENDPOINTs "LISTAR e DELETAR"*******
  //Metodo que ira usar os dados do bd do back
  //e desativar os dados fixo da list temporario!
  listAll(): Observable<Acessorio[]> {
    //Criando/chamando os endpoint que vem do back "CarroController" pelo seu metodo
    //se é post/get/put/delete e aqui no caso busca todos na listAll
    //"nomeclatura padrão do back para fica igual"
    return this.http.get<Acessorio[]>(this.API + "/listAll");
  }

  //DELETAR
  //Duvida olha no back "CarroController"
  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + "/delete/" + id,
      //Quando usar retorno com string
      { responseType: 'text' as 'json' });
    //E chamar ele na carrolist
  }
  //SALVAR
  //Lembrando que o salvar e editar/update e na details
  save(acessorio: Acessorio): Observable<string> {
    return this.http.post<string>(this.API + "/save", acessorio,
      { responseType: 'text' as 'json' });
  }
  //UPDATE
  update(acessorio: Acessorio, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, acessorio,
      { responseType: 'text' as 'json' });
  }
  //SELEÇÃO POR ID
  findById(id: number): Observable<Acessorio> {
    return this.http.get<Acessorio>(this.API + "/findById/" + id);
  }
}

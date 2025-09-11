import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  //4° passo Criar a injeção assincrona e seu import '@angular/core'
  http = inject(HttpClient);

  //Criando um variável para abreviar a rota de saida do back
  // API = "http://localhost:8080/api/marca";
  API = "https://crudangularspring-production.up.railway.app/api/marca";

  constructor() { }

  // *******ENDPOINTs "LISTAR e DELETAR"*******
  //Metodo que ira usar os dados do bd do back
  //e desativar os dados fixo da list temporario!
  listAll(): Observable<Marca[]> {
    //Criando/chamando os endpoint que vem do back "CarroController" pelo seu metodo
    //se é post/get/put/delete e aqui no caso busca todos na listAll
    //"nomeclatura padrão do back para fica igual"
    return this.http.get<Marca[]>(this.API + "/listAll");
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
  save(marca: Marca): Observable<string> {
    return this.http.post<string>(this.API + "/save", marca,
      { responseType: 'text' as 'json' });
  }
  //UPDATE
  update(marca: Marca, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, marca,
      { responseType: 'text' as 'json' });
  }
  //SELEÇÃO POR ID
  findById(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.API + "/findById/" + id);
  }
}
//Todos esses endpoints vem da CarroController do back

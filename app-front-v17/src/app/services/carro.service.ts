import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Carro } from '../models/carro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  //4° passo Criar a injeção assincrona e seu import '@angular/core'
  http = inject(HttpClient);

  //Criando um variável para abreviar a rota de saida do back
  API = "http://localhost:8080/api/carro";

  constructor() { }

  // *******ENDPOINTs "LISTAR e DELETAR"*******
  //Metodo que ira usar os dados do bd do back
  //e desativar os dados fixo da list temporario!
  listAll(): Observable<Carro[]> {
    //Criando/chamando os endpoint que vem do back "CarroController" pelo seu metodo
    //se é post/get/put/delete e aqui no caso busca todos na listAll
    //"nomeclatura padrão do back para fica igual"
    return this.http.get<Carro[]>(this.API + "/listAll");
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
  save(carro: Carro): Observable<string> {
    return this.http.post<string>(this.API + "/save", carro,
      { responseType: 'text' as 'json' });
  }
  //UPDATE
  update(carro: Carro, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, carro,
      { responseType: 'text' as 'json' });
  }
  //SELEÇÃO POR ID
  findById(id: number): Observable<Carro> {
    return this.http.get<Carro>(this.API + "/findById/" + id);
  }
}
//Todos esses endpoints vem da CarroController do back

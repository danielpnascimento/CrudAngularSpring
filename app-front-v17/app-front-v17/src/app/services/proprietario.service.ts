import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proprietario } from '../models/proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {
//4° passo Criar a injeção assincrona e seu import '@angular/core'
  http = inject(HttpClient);

  //Criando um variável para abreviar a rota de saida do back
  API = "http://localhost:8080/api/proprietario";

  constructor() { }

  // *******ENDPOINTs "LISTAR e DELETAR"*******
  //Metodo que ira usar os dados do bd do back
  //e desativar os dados fixo da list temporario!
  listAll(): Observable<Proprietario[]> {
    //Criando/chamando os endpoint que vem do back "CarroController" pelo seu metodo
    //se é post/get/put/delete e aqui no caso busca todos na listAll
    //"nomeclatura padrão do back para fica igual"
    return this.http.get<Proprietario[]>(this.API + "/listAll");
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
  save(proprietario: Proprietario): Observable<string> {
    return this.http.post<string>(this.API + "/save", proprietario,
      { responseType: 'text' as 'json' });
  }
  //UPDATE
  update(proprietario: Proprietario, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, proprietario,
      { responseType: 'text' as 'json' });
  }
  //SELEÇÃO POR ID
  findById(id: number): Observable<Proprietario> {
    return this.http.get<Proprietario>(this.API + "/findById/" + id);
  }
}

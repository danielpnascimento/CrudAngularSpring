import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessorioService } from '../../../services/acessorio.service';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-acessoriosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriosdetails.component.html',
  styleUrl: './acessoriosdetails.component.scss'
})
export class AcessoriosdetailsComponent {
  //Deixando uma instancia vazia temp
  // carro: Carro = new Carro(0, "");
  //usando modal e levamos o dado no input dele
  @Input("acessorio") acessorio: Acessorio = new Acessorio(0, "");
  //Fazendo a saida do modal após salvar um novo ou editar e enviar para msg save
  @Output("retorno") retorno = new EventEmitter<any>();
  //Trazer os dados de campo ja cadastrado
  router = inject(ActivatedRoute);
  //Redireciona após editar/salvar no metodo save
  router2 = inject(Router);

  //Injetado para a busca no banco
  acessorioService = inject(AcessorioService);

  //Criando um construtor que ira trazer os dados no campo para edição
  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }

  }

  //FINDBYID
  //E chamamos esse findById setado aqui pq ainda não tem bd
  findById(id: number) {
    //Desativado para o bd
    // let carroRetornado: Carro = new Carro(id, "Fiesta");
    // this.carro = carroRetornado;

    this.acessorioService.findById(id).subscribe({
      next: retorno => {
        this.acessorio = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  save() {
    //Criando a diferença entre salva um carro editado ou novo
    if (this.acessorio.id > 0) {

      //UDPATE
      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
        //Aqui retorna o Ok (requisições) do back
        //troca o "retorno" pela "mensagem" que e o titulo que vem
        //do metodo do back que já trás o texto msg de lá!
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.router2.navigate(['admin/acessorios'], { state: { acessorioEditado: this.acessorio } })
          //Msg de saida da modal que vai na html
          this.retorno.emit(this.acessorio);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });

    } else {

      //SALVAR
      this.acessorioService.save(this.acessorio).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.router2.navigate(['admin/acessorios'], { state: { acessorioNovo: this.acessorio } })
          //Msg de saida da modal que vai na html
          this.retorno.emit(this.acessorio);
        },

        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
    }
  }
}

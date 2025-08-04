import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2'
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio.service';

@Component({
  selector: 'app-acessoriosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriosdetails.component.html',
  styleUrl: './acessoriosdetails.component.scss'
})
export class AcessoriosdetailsComponent {
  @Input("acessorio") acessorio: Acessorio = new Acessorio(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  //Redireciona após editar/salvar no metodo save
  router3 = inject(Router);

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
          next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.router3.navigate(['admin/acessorios'], { state: { acessorioEditado: this.acessorio } })
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
          this.router3.navigate(['admin/acessorios'], { state: { acessorioNovo: this.acessorio } })
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

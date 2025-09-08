import { Acessorio } from './../../../models/acessorio';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import { CarroService } from './../../../services/carro.service';
import Swal from 'sweetalert2';
import { Marca } from '../../../models/marca';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcaslistComponent } from "../../marcas/marcaslist/marcaslist.component";
import { AcessorioslistComponent } from "../../acessorios/acessorioslist/acessorioslist.component";
import { Proprietario } from '../../../models/proprietario';
import { ProprietarioslistComponent } from '../../proprietarios/proprietarioslist/proprietarioslist.component';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MarcaslistComponent, AcessorioslistComponent, ProprietarioslistComponent],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  //Deixando uma instancia vazia temp
  // carro: Carro = new Carro(0, "");
  //usando modal e levamos o dado no input dele
  @Input("carro") carro: Carro = new Carro(0, "");
  //Fazendo a saida do modal após salvar um novo ou editar e enviar para msg save
  @Output("retorno") retorno = new EventEmitter<any>();
  //Trazer os dados de campo ja cadastrado
  router = inject(ActivatedRoute);
  //Redireciona após editar/salvar no metodo save
  router2 = inject(Router);

  //Elementos da modal
  modalService = inject(MdbModalService);
  //Para o ng templante esconder e chama o modal
  @ViewChild("modalMarcas") modalMarcas!: TemplateRef<any>;
  @ViewChild("modalAcessorios") modalAcessorios!: TemplateRef<any>;
  @ViewChild("modalProprietarios") modalProprietarios!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  //Injetado para a busca no banco
  carroService = inject(CarroService);

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

    this.carroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;
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
    if (this.carro.id > 0) {

      //UDPATE
      this.carroService.update(this.carro, this.carro.id).subscribe({
        //Aqui retorna o Ok (requisições) do back
        //troca o "retorno" pela "mensagem" que e o titulo que vem
        //do metodo do back que já trás o texto msg de lá!
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.router2.navigate(['admin/carros'], { state: { carroEditado: this.carro } })
          //Msg de saida da modal que vai na html
          this.retorno.emit(this.carro);
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
      this.carroService.save(this.carro).subscribe({
        // this.carroService.save(carroParaSalvar).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.router2.navigate(['admin/carros'], { state: { carroNovo: this.carro } })
          //Msg de saida da modal que vai na html
          this.retorno.emit(this.carro);
          // this.retorno.emit(carroParaSalvar);
        },

        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erroooo',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });

      // Desativado foi atribuida dentro do save
      // Swal.fire({
      //   title: 'Salvo com Sucesso!',
      //   // text: 'Salvo com Sucesso!',
      //   icon: 'success',
      //   confirmButtonText: 'Ok'
      // });
      // alert('Salvo com Sucesso!')
      //após salva ele redireciona para carroList
      //mover para dentro do save
      // this.router2.navigate(['admin/carros'], { state: { carroNovo: this.carro } })
    }

    //Msg de saida da modal que vai na html
    //mover para dentro do next do save e update agora
    // this.retorno.emit(this.carro);
  }


  //Função para exibir a list marcas dentro do modal
  //e personalizadando o tamanho com modal-lg
  buscarMarca() {
    this.modalRef = this.modalService.open(this.modalMarcas, { modalClass: 'modal-lg' });
  }

  buscarAcessorio() {
    this.modalRef = this.modalService.open(this.modalAcessorios, { modalClass: 'modal-lg' });
  }

  buscarProprietario() {
    this.modalRef = this.modalService.open(this.modalProprietarios, { modalClass: 'modal-lg' });
  }

  retornoMarca(marca: Marca) {
    this.carro.marca = marca;
    this.modalRef.close();
  }


  retornoAcessorio(acessorio: Acessorio) {
    //Caso esteja nulo ele venha vazio para não da BO
    if (this.carro.acessorios == null)
      this.carro.acessorios = [];
    //Trazendo o item escolhido para dentro da mini lista de acessorios
    //para dentro do obj carro
    this.carro.acessorios.push(acessorio);
    this.modalRef.close();

  }

  retornoProprietario(proprietario: Proprietario) {
    //Caso esteja nulo ele venha vazio para não da BO
    if (this.carro.proprietarios == null)
      this.carro.proprietarios = [];
    //Trazendo o item escolhido para dentro da mini lista de proprietario
    //para dentro do obj carro
    this.carro.proprietarios.push(proprietario);
    this.modalRef.close();

  }

  //Apenas desvicula o iten sem deletar ele do crud acessorios
  desvicularAcessorioCarro(acessorio: Acessorio) {
    let posicao = this.carro.acessorios.findIndex(x => { return x.id == acessorio.id });
    this.carro.acessorios.splice(posicao, 1);
  }

  desvicularProprietarioCarro(proprietario: Proprietario) {
    let posicao = this.carro.proprietarios.findIndex(x => { return x.id == proprietario.id });
    this.carro.proprietarios.splice(posicao, 1);
  }
}



import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { CarroService } from './../../../services/carro.service';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  //Criando uma lista com dados temp manual antes de chamar o do bd
  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, "");

  //Trabalhando com modal e não router
  modalService = inject(MdbModalService);
  //Para o ng templante esconder e chama o modal
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  //Injetando para o back
  carroService = inject(CarroService);

  constructor() {
    //deixa igual o back
    // this.findAll();
    this.listAll();

    //Usamos um recurso do Angular o history que vai setar esse novo ou editado carro na lista temp
    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroNovo) {
      //setando um id fixo para o novo
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }

    if (carroEditado) {
      let indice = this.lista.findIndex(x => { return x.id == carroEditado.id });
      this.lista[indice] = carroEditado;
    }
  }

  //Deixa nomenclatura igual o back
  //findAll() {
  listAll() {
    //Desativando o modo/dados temp/fixo/statico para chama o do back
    //   this.lista.push(new Carro(1, 'Fiesta'));
    //   this.lista.push(new Carro(2, 'Monza'));
    //   this.lista.push(new Carro(3, 'Ka'));

    this.carroService.listAll().subscribe({
      //Aqui retorna o Ok (requisições) do back
      next: lista => {
        //Essa lista vem da lista do array acima, que recebe a lista do back!
        this.lista = lista;
      },
      //Aqui retorna erro (badrequest, exceptions) do back
      error: erro => {
        // alert('Ocorreu algum erro');
        Swal.fire({
          title: 'Ocorreu algum erro',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  //Agora criar um for no html dele para chamar essa lista la do carroList
  //E criamos o metodo deletar dessa lista temp pegando pelo indice/id e seu numero!
  deleteById(carro: Carro) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      // text: 'Salvo com Sucesso!',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {

        //DELETAR
        //chamando o endpoint/metodo da carro.service deletar no botão
        this.carroService.delete(carro.id).subscribe({
          //Aqui retorna o Ok (requisições) do back
          //troca o "lista" pela "mensagem" que e o titulo que vem
          //do metodo do back que já trás o texto msg de lá!
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            //Aqui faz ele após deletar um id ele da/faz/chama/Refresh
            //para listAll sem fica o dado lá e ter que atualizar a pagina manualmente
            this.listAll();
          },
          //Aqui retorna erro (badrequest, exceptions) do back
          error: erro => {
            Swal.fire({
              title: 'Ocorreu algum erro',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }

  //Para modal chamo o identificado da ng template para os metodos do btn new/edit
  //e adciono o @input na carrodetails para trazer os dados no campo
  new() {
    // Aqui para novo ele limpa o input
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  };

  edit(carro: Carro) {
    //Aqui para editar ele trás os dados no input e faz o processo de edita
    // this.carroEdit = carro;
    //usando o modo para clonar por referencia de objeto para caso o campo
    //for digitado e cancelado o dado acaba sendo registrado
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  //LISTAR
  //metodo da modal retornoDetalhe
  retornoDetalhe(carro: Carro) {
    //incluindo apenas o reflesh
    this.listAll();
    //Fechando a modal ao sair do evento
    this.modalRef.close();

  }
}



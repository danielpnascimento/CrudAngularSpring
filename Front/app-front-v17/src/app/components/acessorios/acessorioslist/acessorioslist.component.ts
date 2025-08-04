import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { AcessoriosdetailsComponent } from "../acessoriosdetails/acessoriosdetails.component";
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio.service';

@Component({
  selector: 'app-acessorioslist',
  standalone: true,
  imports: [MdbModalModule, AcessoriosdetailsComponent],
  templateUrl: './acessorioslist.component.html',
  styleUrl: './acessorioslist.component.scss'
})
export class AcessorioslistComponent {
  listaAcessorio: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio(0, "");

  @Input("esconderBtn") esconderBtn: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  //Elementos da modal
  modalService = inject(MdbModalService);;
  @ViewChild("modalAcessorioDetalhe") modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  //Injetando para o back
  AcessorioService = inject(AcessorioService);

  constructor() {
    this.listAll();

    let acessorioNovo = history.state.acessorioNovo;
    let acessorioEditado = history.state.acessorioEditado;

    if (acessorioNovo) {
      //setando um id fixo para o novo
      // marcaNovo.id = 555;
      this.listaAcessorio.push(acessorioNovo);
    }

    if (acessorioEditado) {
      let indice = this.listaAcessorio.findIndex(x => { return x.id == acessorioEditado.id });
      this.listaAcessorio[indice] = acessorioEditado;
    }
  }

  listAll() {
    this.AcessorioService.listAll().subscribe({
      //Aqui retorna o Ok (requisições) do back
      next: listaAcessorio => {
        //Essa lista vem da lista do array acima, que recebe a lista do back!
        this.listaAcessorio = listaAcessorio;
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


  deleteById(acessorio: Acessorio) {
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
        this.AcessorioService.delete(acessorio.id).subscribe({
          //Aqui retorna o Ok (requisições) do back
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

  new() {
    this.acessorioEdit = new Acessorio(0, "");
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  };

  edit(acessorio: Acessorio) {
    this.acessorioEdit = Object.assign({}, acessorio);
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  //LISTAR
  //metodo da modal retornoDetalhe
  retornoDetalhe(acessorio: Acessorio) {
    //teste ate aqui
    // alert('Selecionado acessório: ' + acessorio.nome)
    //incluindo apenas o reflesh
    this.listAll();
    //Fechando a modal ao sair do evento
    this.modalRef.close();

  }

  // Pego o marca que vem do html
  select(acessorio: Acessorio) {
    this.retorno.emit(acessorio);

  }

}

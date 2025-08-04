import { MarcaService } from './../../../services/marca.service';
import { Component, inject, TemplateRef, ViewChild, viewChild, EventEmitter, Output, input, Input } from '@angular/core';
import { Marca } from './../../../models/marca';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {

  listaMarca: Marca[] = [];
  marcaEdit: Marca = new Marca(0, "");

  @Input("esconderBtn") esconderBtn: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  //Elementos da modal
  modalService = inject(MdbModalService);;
  @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  //Injetando para o back
  MarcaService = inject(MarcaService);

  constructor() {
    this.listAll();

    let marcaNovo = history.state.marcaNovo;
    let marcaEditado = history.state.marcaEditado;

    if (marcaNovo) {
      //setando um id fixo para o novo
      // marcaNovo.id = 555;
      this.listaMarca.push(marcaNovo);
    }

    if (marcaEditado) {
      let indice = this.listaMarca.findIndex(x => { return x.id == marcaEditado.id });
      this.listaMarca[indice] = marcaEditado;
    }
  }

  listAll() {
    this.MarcaService.listAll().subscribe({
      //Aqui retorna o Ok (requisições) do back
      next: listaMarca => {
        //Essa lista vem da lista do array acima, que recebe a lista do back!
        this.listaMarca = listaMarca;
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


  deleteById(marca: Marca) {
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
        this.MarcaService.delete(marca.id).subscribe({
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

  new() {
    this.marcaEdit = new Marca(0, "");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  };

  edit(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca);
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  //LISTAR
  //metodo da modal retornoDetalhe
  retornoDetalhe(marca: Marca) {
    //incluindo apenas o reflesh
    this.listAll();
    //Fechando a modal ao sair do evento
    this.modalRef.close();

  }

  // Pego o marca que vem do html
  select(marca: Marca) {
    this.retorno.emit(marca);

  }

}

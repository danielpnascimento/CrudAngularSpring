import { Component, inject, TemplateRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { Marca } from './../../../models/marca';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';
import { MarcaService } from './../../../services/marca.service';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {

  //Criando uma lista temp manual antes de chamar o bd
  lista: Marca[] = [];
  // Para modal
  marcaEdit: Marca = new Marca(0, "");

  @Input("esconderBtn") esconderBtn: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

//Trabalhando com modal e não router
  modalService = inject(MdbModalService);
  //Para o ng templante esconder e chama o modal
  @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  //Injetando para o back
  marcaService = inject(MarcaService);

  constructor() {
     //deixa igual o back
    // this.findAll();
    this.listAll();

    // this.lista.push(new Carro(1, 'Fiesta'));
    // this.lista.push(new Carro(2, 'Monza'));
    // this.lista.push(new Carro(3, 'Ka'));

    //Usamos um recurso do Angular o history que vai setar esse novo ou editado carro na lista temp
    let marcaNovo = history.state.marcaNovo;
    let marcaEditado = history.state.marcaEditado;

    if (marcaNovo) {
      //setando um id fixo para o novo
      marcaNovo.id = 555;
      this.lista.push(marcaNovo);
    }

    if (marcaEditado) {
      let indice = this.lista.findIndex(x => { return x.id == marcaEditado.id });
      this.lista[indice] = marcaEditado;
    }
  }

  //Deixa nomenclatura igual o back
  //findAll() {
  listAll() {
    //Desativando o modo/dados temp/fixo/statico para chama o do back
    //   this.lista.push(new Carro(1, 'Fiesta'));
    //   this.lista.push(new Carro(2, 'Monza'));
    //   this.lista.push(new Carro(3, 'Ka'));

    this.marcaService.listAll().subscribe({
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
        this.marcaService.delete(marca.id).subscribe({
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
    this.marcaEdit = new Marca(0, "");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  };

  edit(marca: Marca) {
    //Aqui para editar ele trás os dados no input e faz o processo de edita
    // this.carroEdit = carro;
    //usando o modo para evitar clonar por referencia de objeto para caso o campo
    //for digitado e cancelado o dado acaba sendo registrado
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

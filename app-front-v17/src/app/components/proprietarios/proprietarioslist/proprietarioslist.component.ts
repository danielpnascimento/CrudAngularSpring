import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Proprietario } from '../../../models/proprietario';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { ProprietariosdetailsComponent } from '../proprietariosdetails/proprietariosdetails.component';
import { ProprietarioService } from '../../../services/proprietario.service';

@Component({
  selector: 'app-proprietarioslist',
  standalone: true,
  imports: [MdbModalModule, ProprietariosdetailsComponent],
  templateUrl: './proprietarioslist.component.html',
  styleUrl: './proprietarioslist.component.scss'
})
export class ProprietarioslistComponent {
  //Criando uma lista temp manual antes de chamar o bd
  lista: Proprietario[] = [];
  // Para modal
  proprietarioEdit: Proprietario = new Proprietario(0, "");

  @Input("esconderBtn") esconderBtn: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  //Trabalhando com modal e não router
  modalService = inject(MdbModalService);
  //Para o ng templante esconder e chama o modal
  @ViewChild("modalProprietarioDetalhe") modalProprietarioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  //Injetando para o back
  proprietarioService = inject(ProprietarioService);

  constructor() {
    //deixa igual o back
    // this.findAll();
    this.listAll();

    // this.lista.push(new Carro(1, 'Fiesta'));
    // this.lista.push(new Carro(2, 'Monza'));
    // this.lista.push(new Carro(3, 'Ka'));

    //Usamos um recurso do Angular o history que vai setar esse novo ou editado carro na lista temp
    let proprietarioNovo = history.state.proprietarioNovo;
    let proprietarioEditado = history.state.proprietarioEditado;

    if (proprietarioNovo) {
      //setando um id fixo para o novo
      proprietarioNovo.id = 555;
      this.lista.push(proprietarioNovo);
    }

    if (proprietarioEditado) {
      let indice = this.lista.findIndex(x => { return x.id == proprietarioEditado.id });
      this.lista[indice] = proprietarioEditado;
    }
  }

  //Deixa nomenclatura igual o back
  //findAll() {
  listAll() {
    //Desativando o modo/dados temp/fixo/statico para chama o do back
    //   this.lista.push(new Carro(1, 'Fiesta'));
    //   this.lista.push(new Carro(2, 'Monza'));
    //   this.lista.push(new Carro(3, 'Ka'));

    this.proprietarioService.listAll().subscribe({
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
  deleteById(proprietario: Proprietario) {
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
        this.proprietarioService.delete(proprietario.id).subscribe({
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
  //Para modal chamo o indentificado da ng template para os metodos do btn new/edit
  //e adciono o @input na carrodetails para trazer os dados no campo
  new() {
    this.proprietarioEdit = new Proprietario(0, "");
    this.modalRef = this.modalService.open(this.modalProprietarioDetalhe);
  };

  edit(proprietario: Proprietario) {
    this.proprietarioEdit = Object.assign({}, proprietario);
    this.modalRef = this.modalService.open(this.modalProprietarioDetalhe);
  }

  //LISTAR
  //metodo da modal retornoDetalhe
  retornoDetalhe(proprietario: Proprietario) {
    //teste ate aqui
    // alert('Selecionado acessório: ' + acessorio.nome)
    //incluindo apenas o reflesh
    this.listAll();
    //Fechando a modal ao sair do evento
    this.modalRef.close();
  }

  // Pego o marca que vem do html
  select(proprietario: Proprietario) {
    this.retorno.emit(proprietario);
  }
}

package br.com.app.app.service;

import br.com.app.app.entity.Acessorio;
import br.com.app.app.repository.AcessorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcessorioService {
    //Chamando e instanciando na repository para registro no banco
    @Autowired
    private AcessorioRepository acessorioRepository;

    public String save(Acessorio acessorio) {


        //Chamando repository para instanciar no banco
        this.acessorioRepository.save(acessorio);
//        return "Carro salvo com sucesso!";
        return acessorio.getNome() + " - Acessório salvo com sucesso!";
    }


    public String update(Acessorio acessorio, long id) {

        acessorio.setId(id);
        //Para não confundir com save do post aqui em cima
        //Criamos um set para setar em um id existênte!
        this.acessorioRepository.save(acessorio);
        //return "Carro atualizado com sucesso!";
        return acessorio.getNome() + " - Acessório atualizado com sucesso!";
    }

    public String delete(long id) {
        this.acessorioRepository.deleteById(id);
        return " Acessório deletado com sucesso!";
    }

    //renomeado o findAll para listAll pq ele mudou na aula 16 para o front
    public List<Acessorio> listAll() {
        //esse findAll não muda!
        List<Acessorio> lista = this.acessorioRepository.findAll();
        return lista;
    }

    public Acessorio findById(long id) {
        Acessorio acessorio = this.acessorioRepository.findById(id).get();
        return acessorio;
    }

    //Criação de filtro customizados "nome"
    public List<Acessorio> findByNome(String nome) {
        return this.acessorioRepository.findByNome(nome);
    }

    //Criação de filtro customizados "Acessorio"
    //Aqui criamos uma conversão para idAcessorio onde instanciamos
    //ela em marca e chamamos ela depois na lista de carro
    public List<Acessorio> findByAcessorio(long idAcessorio) {
        Acessorio acessorio = new Acessorio();
        acessorio.setId(idAcessorio);
        return this.acessorioRepository.findByAcessorio(acessorio);
    }

}


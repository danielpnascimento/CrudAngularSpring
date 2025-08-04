package br.com.app.app.service;

import br.com.app.app.entity.Acessorio;
import br.com.app.app.entity.Marca;
import br.com.app.app.repository.AcessorioRepository;
import br.com.app.app.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class AcessorioService {
    //Chamando e instanciando na repository para registro no banco
    @Autowired
    private AcessorioRepository acessorioRepository;

    public String save(Acessorio acessorio) {

        //Regra de negócio
        this.verificarNomeAcessorio(acessorio.getNome(), acessorio.getAno());
//        this.verificarNomeMarca(marca.getNome());

        //Chamando repository para instanciar no banco
        this.acessorioRepository.save(acessorio);
        //return "Carro salvo com sucesso!";
        return acessorio.getNome() + " Acessório salva com sucesso!";
    }

    //Regra de negócio
    public boolean verificarNomeAcessorio(String nome, int ano) {
        if (nome.equals("Jeep Compass") && ano < 2006)
            throw new RuntimeException();
        return true;
    }

    public String update(Acessorio acessorio, long id) {

        verificarNomeAcessorio(acessorio.getNome(), acessorio.getAno());
//        this.verificarNomeMarca(marca.getNome());

        acessorio.setId(id);
        //Para não confundir com save do post aqui em cima
        //Criamos um set para setar em um id existênte!
        this.acessorioRepository.save(acessorio);
        //return "Carro atualizado com sucesso!";
        return acessorio.getNome() + " Acessório atualizada com sucesso!";
    }
    //renomeado o findAll para listAll pq ele mudou na aula 16 para o front
    public List<Acessorio> listAll() {
        //esse findAll não muda!
        List<Acessorio> lista = this.acessorioRepository.findAll();
//        return this.marcaRepository.findAll();
        return lista;
    }

    public Acessorio findById(long id) {
        Acessorio acessorio = this.acessorioRepository.findById(id).get();
        return acessorio;
//        return this.marcaRepository.findById(id).orElse(null);
    }

    public String delete(long id) {
        this.acessorioRepository.deleteById(id);
        return " Acessório deletada com sucesso!";
    }

    //Criação de filtro customizados "nome"
    public List<Acessorio> findByNome(String nome) {
        return this.acessorioRepository.findByNome(nome);
    }

    //Criação de filtro customizados "marca"
    //Aqui criamos uma conversão para idmarca onde instanciamos
    //ela em marca e chamamos ela depois na lista de carro
    public List<Acessorio> findByAcessorio(long idAcessorio) {
        Acessorio acessorio = new Acessorio();
        acessorio.setId(idAcessorio);
//        return this.marcaRepository.findByMarca(marca);
//        return this.marcaRepository.findByMarca(marca);
        return this.acessorioRepository.findByCategoria(acessorio);
    }

    //3° modo com JPQL
    public List<Acessorio> findAcimaAno(int ano) {
        return this.acessorioRepository.findAcimaAno(ano);
    }
}


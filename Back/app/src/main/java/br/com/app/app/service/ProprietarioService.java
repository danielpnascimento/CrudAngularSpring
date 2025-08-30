package br.com.app.app.service;

import br.com.app.app.entity.Proprietario;
import br.com.app.app.repository.ProprietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProprietarioService {
    @Autowired
    private ProprietarioRepository proprietarioRepository;

    public String save(Proprietario proprietario) {

        //Chamando repository para instanciar no banco
        this.proprietarioRepository.save(proprietario);
//        return "Carro salvo com sucesso!";
        return proprietario.getNome() + " - Proprietario salvo com sucesso!";
    }

    public String update(Proprietario proprietario, long id) {

        proprietario.setId(id);
        //Para não confundir com save do post aqui em cima
        //Criamos um set para setar em um id existênte!
        this.proprietarioRepository.save(proprietario);
        //return "Carro atualizado com sucesso!";
        return proprietario.getNome() + " - Proprietario atualizado com sucesso!";
    }

    public String delete(long id) {
        this.proprietarioRepository.deleteById(id);
        return " Proprietario deletado com sucesso!";
    }

    //renomeado o findAll para listAll pq ele mudou na aula 16 para o front
    public List<Proprietario> listAll() {
        //esse findAll não muda!
        List<Proprietario> lista = this.proprietarioRepository.findAll();
        return lista;
    }

    public Proprietario findById(long id) {
        Proprietario proprietario = this.proprietarioRepository.findById(id).get();
        return proprietario;
    }

    //Criação de filtro customizados "nome"
    public List<Proprietario> findByNome(String nome) {
        return this.proprietarioRepository.findByNome(nome);
    }

    //Criação de filtro customizados "proprietario"
    //Aqui criamos uma conversão para idProprietario onde instanciamos
    //ela em marca e chamamos ela depois na lista de carro
    public List<Proprietario> findByProprietario(long idProprietario) {
        Proprietario proprietario = new Proprietario();
        proprietario.setId(idProprietario);
        return this.proprietarioRepository.findByProprietario(proprietario);
    }

}


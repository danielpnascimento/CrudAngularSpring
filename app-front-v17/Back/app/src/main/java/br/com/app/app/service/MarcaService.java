package br.com.app.app.service;

import br.com.app.app.entity.Marca;
import br.com.app.app.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaService {

    //Chamando e instanciando na repository para registro no banco
    @Autowired
    private MarcaRepository marcaRepository;

    public String save(Marca marca) {

            //Chamando repository para instanciar no banco
        this.marcaRepository.save(marca);
        //return "Carro salvo com sucesso!";
        return marca.getNome() + " Marca salva com sucesso!";
    }

     public String update(Marca marca, long id) {

        marca.setId(id);
        //Para não confundir com save do post aqui em cima
        //Criamos um set para setar em um id existênte!
        this.marcaRepository.save(marca);
        //return "Carro atualizado com sucesso!";
        return marca.getNome() + " Marca atualizada com sucesso!";
    }

    public String delete(long id) {
        this.marcaRepository.deleteById(id);
        return " Marca deletada com sucesso!";
    }

    //renomeado o findAll para listAll pq ele mudou na aula 16 para o front
    public List<Marca> listAll() {
        //esse findAll não muda!
        List<Marca> lista = this.marcaRepository.findAll();
//        return this.marcaRepository.findAll();
        return lista;
    }

    public Marca findById(long id) {
        Marca marca = this.marcaRepository.findById(id).get();
        return marca;
//        return this.marcaRepository.findById(id).orElse(null);
    }

    //Criação de filtro customizados "nome" Consultas JPQL
    public List<Marca> findByNome(String nome) {
        return this.marcaRepository.findByNome(nome);
    }

    //Criação de filtro customizados "marca"
    //Aqui criamos uma conversão para idmarca onde instanciamos
    //ela em marca e chamamos ela depois na lista de carro
    public List<Marca> findByMarca(long idMarca) {
        Marca marca = new Marca();
        marca.setId(idMarca);
        return this.marcaRepository.findByMarca(marca);
    }

    //3° modo com JPQL
    public List<Marca> findAcimaAno(int ano) {
        return this.marcaRepository.findAcimaAno(ano);
    }
}

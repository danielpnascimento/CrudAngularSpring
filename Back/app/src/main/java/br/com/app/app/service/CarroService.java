package br.com.app.app.service;

import br.com.app.app.entity.Carro;
import br.com.app.app.entity.Marca;
import br.com.app.app.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarroService {

    //Chamando e instanciando na repository para registro no banco
    @Autowired
    private CarroRepository carroRepository;

    public String save(Carro carro) {

        //Regra de negócio
        this.verificarNomeCarro(carro.getNome(), carro.getAno());

        //Chamando repository para instanciar no banco
        this.carroRepository.save(carro);
        //return "Carro salvo com sucesso!";
        return carro.getNome() + " Carro salvo com sucesso!";
    }

    //Regra de negócio
    public boolean verificarNomeCarro(String nome, int ano) {
        if (nome.equals("Jeep Compass") && ano < 2006)
            throw new RuntimeException();
        return true;
    }

    public String update(Carro carro, long id) {

        this.verificarNomeCarro(carro.getNome(), carro.getAno());

        carro.setId(id);
        //Para não confundir com save do post aqui em cima
        //Criamos um set para setar em um id existênte!
        this.carroRepository.save(carro);
        //return "Carro atualizado com sucesso!";
        return carro.getNome() + " Carro atualizado com sucesso!";
    }
    //renomeado o findAll para listAll pq ele mudou na aula 16 para o front
    public List<Carro> listAll() {
        //esse findAll não muda!
        List<Carro> lista = this.carroRepository.findAll();
        return lista;
    }

    public Carro findById(long id) {
        Carro carro = this.carroRepository.findById(id).get();
        return carro;
    }

    public String delete(long id) {
        this.carroRepository.deleteById(id);
        return " Carro deletado com sucesso!";
    }

    //Criação de filtro customizados "nome"
    public List<Carro> findByNome(String nome) {
        return this.carroRepository.findByNome(nome);
    }

    //Criação de filtro customizados "marca"
    //Aqui criamos uma conversão para idmarca onde instanciamos
    //ela em marca e chamamos ela depois na lista de carro
    public List<Carro> findByMarca(long idMarca) {
        Marca marca = new Marca();
        marca.setId(idMarca);
        return this.carroRepository.findByMarca(marca);
    }

    //3° modo com JPQL
    public List<Carro> findAcimaAno(int ano) {
        return this.carroRepository.findAcimaAno(ano);
    }
}

/*
Criação dos métodos!
Ela e a classe de serviço onde ela envia e recebe
da controller e para a repository persistir no banco
"Função do service e processar as regras de negócio para a controller"
Aula 06c Regras de Negócio
https://youtu.be/-d7DizM6aNM?si=xjqEp1Wg5fFZaKWS
Checar amanha pq está passando!

*/
package br.com.app.app.repository;

import br.com.app.app.entity.Carro;
import br.com.app.app.entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarroRepository extends JpaRepository<Carro, Long> {

    //1° modo JPA Detalhe importante na busca customizada
    //e o Nome no findBy tem que ser a primeira letra em
    // caixa alta e é da classe Carro setada na list
    //Agora criar os métodos para service e controller que enviará para aqui.
    public List<Carro> findByNome(String nome);

    //2° modo JPA Aqui vc chama ela pelo id no postman
    public List<Carro> findByMarca(Marca marca);

    //3° Nessa busca customizada, usamos o modo JPQL
    //onde setamos > acima de qualquer ano setado ele busca
    @Query("From Carro c WHERE c.ano > :ano")
    public List<Carro> findAcimaAno(int ano);


}

/* Interface que realiza a persistência no banco!
Criando um filtro customizado pelo nome atributo da classe Carro!

Só ir no Postman e cria o filtro get
http://localhost:8080/api/carro/findByNome?nome=Bmw x10
E seta parâmetro para nome e os nomes que tem registrado lá para buscar ex; bmw x10

Aula 4B
https://youtu.be/jr7-Wr4qmAA?si=fcFy0KJsHKUD_1gx

* */
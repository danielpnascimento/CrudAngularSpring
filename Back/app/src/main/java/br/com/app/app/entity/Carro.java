package br.com.app.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//Representa uma tabela no bd
@Entity
public class Carro {
    //Pega o id e transforma em uma Chave primaria no bd
    @Id
    //Deixa ele gerando com auto incremento
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    //    @NotNull(message = "Nome não pode ser nulo")
    private String nome;
    private int ano;

    //Criando o relacionamento JPA
    //Onde muitos carro só podem ter uma Marca
    //Cascade e uma forma de registrar id, nome, ano tudo em uma requisição só!
    //Sendo desativado pq na aula 19 ele foi mudado e ta dando erro no modal salvar novo com a marca
    //@ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne
    //Anotação para ignorar deserialização da propriedade/relacionamento
    //das classes carro e marca para evitar o loop na busca do findAll no Postman
    @JsonIgnoreProperties("carros")
    private Marca marca;

    @ManyToMany(cascade = CascadeType.ALL)
//    @ManyToMany
//Mesmo que o spring faz automaticamente e bom seta
//a relação na tabela carro e proprietario e criar/apontar
//essa tabela senão ele acaba criando uma por ele mesmo.
    @JoinTable(name = "carro_proprietario")
    private List<Proprietario> proprietarios;

    //Mudado na aula 19
    //@ManyToMany(cascade = CascadeType.ALL)
    @ManyToMany
    @JoinTable(name = "carro_acessorio")
    private List<Acessorio> acessorios;


}





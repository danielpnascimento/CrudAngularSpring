package br.com.app.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//Representa uma tabela no bd
@Entity
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private int ano;

    //Relacionamento
    @OneToMany(mappedBy = "marca")
    private List<Carro> carros;

    //Replicando para o CRUD Marca
    @ManyToOne(cascade = CascadeType.ALL)
    //Anotação para ignorar deserialização da propriedade/relacionamento
    //das classes "carro e marca" para evitar o loop na busca do findAll no Postman
    //seta o objeto em plural como esta "carros"
    @JsonIgnoreProperties("marcas")
    private Marca marca; // ou outro nome se for hierarquia de marcas
}

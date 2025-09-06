package br.com.app.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//Representa uma tabela no bd
@Entity
public class Proprietario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private int idade;
    private String cnpj;

    //  Replicando para o CRUD Acessorio
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("proprietarios")
    private Proprietario proprietario; // ou outro nome se for hierarquia de marcas

}

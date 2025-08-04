package br.com.app.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String cnpj;
    private int ano;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("marcas")
    private Marca categoria; // ou outro nome se for hierarquia de marcas

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "marca_proprietario")
    private List<Proprietario> proprietarios;

}

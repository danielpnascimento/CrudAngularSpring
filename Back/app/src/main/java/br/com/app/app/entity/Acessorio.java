package br.com.app.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//Representa uma tabela no bd
@Entity
public class Acessorio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private int quantidade;

    //  Replicando para o CRUD Acessorio
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("acessorios")
    private Acessorio acessorio; // ou outro nome se for hierarquia de marcas
}

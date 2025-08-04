package br.com.app.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//Representa uma tabela no bd
@Entity
public class Acessorio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nome;
    private String cnpj;
    private int ano;

//    @ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne
    @JsonIgnoreProperties("acessorios")
    private Marca categoria; // ou outro nome se for hierarquia de marcas

//    @ManyToMany(cascade = CascadeType.ALL)
    @ManyToMany
    @JoinTable(name = "carro_acessorio")
    private List<Acessorio> acessorios;
    @ManyToMany(mappedBy = "acessorios")


    private Collection<Carro> carros;
    public Collection<Carro> getCarros() {
        return carros;
    }

    public void setCarros(Collection<Carro> carros) {
        this.carros = carros;
    }

}

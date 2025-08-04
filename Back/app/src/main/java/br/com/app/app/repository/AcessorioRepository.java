package br.com.app.app.repository;

import br.com.app.app.entity.Acessorio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AcessorioRepository extends JpaRepository<Acessorio, Long>{

    public List<Acessorio> findByNome(String nome);

    //    public List<Marca> findByMarca(Marca marca);
//    public List<Marca> findByMarca(Marca carro);
    public List<Acessorio> findByCategoria(Acessorio categoria);

    //    @Query("From Marca c WHERE c.ano > :ano")
    @Query("From Acessorio m WHERE m.ano > :ano")
    public List<Acessorio> findAcimaAno(int ano);
}

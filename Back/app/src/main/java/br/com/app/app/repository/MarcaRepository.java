package br.com.app.app.repository;

import br.com.app.app.entity.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MarcaRepository extends JpaRepository<Marca, Long> {

    public List<Marca> findByNome(String nome);

//        public List<Marca> findByMarca(Marca marca);
//    public List<Marca> findByMarca(Marca carro);
    public List<Marca> findByCategoria(Marca categoria);

    //    @Query("From Marca c WHERE c.ano > :ano")
    @Query("From Marca m WHERE m.ano > :ano")
    public List<Marca> findAcimaAno(int ano);
}

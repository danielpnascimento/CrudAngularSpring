package br.com.app.app.repository;

import br.com.app.app.entity.Acessorio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcessorioRepository extends JpaRepository<Acessorio, Long>{

    public List<Acessorio> findByNome(String nome);

    public List<Acessorio> findByAcessorio(Acessorio acessorio);

}

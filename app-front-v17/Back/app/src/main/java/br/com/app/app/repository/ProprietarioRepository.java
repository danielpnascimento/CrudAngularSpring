package br.com.app.app.repository;

import br.com.app.app.entity.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Long> {
    public List<Proprietario> findByNome(String nome);
    public List<Proprietario> findByProprietario(Proprietario proprietario);
}

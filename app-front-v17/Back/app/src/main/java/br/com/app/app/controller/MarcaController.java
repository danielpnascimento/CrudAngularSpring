package br.com.app.app.controller;

import br.com.app.app.entity.Marca;
import br.com.app.app.service.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marca")
@CrossOrigin("*")
public class MarcaController {
    @Autowired
    private MarcaService marcaService;


//    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Marca marca) {
        try {
            //msg de ok e msg de erro
            String mensagem = this.marcaService.save(marca);
            //método ok faz parte do create
//            return new ResponseEntity<>(mensagem, HttpStatus.CREATED);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Marca marca, @PathVariable long id) {
        try {
            String mensagem = this.marcaService.update(marca, id);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        try {
            String mensagem = this.marcaService.delete(id);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

//    Aqui tem que da permissão para ambos pq senão o admin não adiciona marca no new carros
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    //renomeado para o front pq na Aula 16 ele mudou
    //@GetMapping("/findAll")
    @GetMapping("/listAll")
    public ResponseEntity<List<Marca>> listAll() {
        try {
            List<Marca> lista = this.marcaService.listAll();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    //renomeado para o front pq na Aula 18 ele mudou
    //@GetMapping("/findAll/{id}")
    //@GetMapping("/listAll/{id}")
    @GetMapping("/findById/{id}")
    public ResponseEntity<Marca> findById(@PathVariable long id) {
        try {
            Marca marca = this.marcaService.findById(id);
            return new ResponseEntity<>(marca, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    //Criando o método de consulta/filtro JPQL
    //Filtro de customização busca "nome"
    @GetMapping("/findByNome")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Marca>> findByNome(@RequestParam String nome) {
        try {
            List<Marca> lista = this.marcaService.findByNome(nome);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('USER')")
    //Filtro de customização busca "marca"
    @GetMapping("/findByMarca")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Marca>> findByMarca(@RequestParam long idMarca) {
        try {
            List<Marca> lista = this.marcaService.findByMarca(idMarca);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //3° modo com JPQL
    @GetMapping("/findAcimaAno")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Marca>> findAcimaAno(@RequestParam int ano) {
        try {
            List<Marca> lista = this.marcaService.findAcimaAno(ano);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}

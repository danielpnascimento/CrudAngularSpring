package br.com.app.app.controller;

import br.com.app.app.entity.Proprietario;
import br.com.app.app.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proprietario")
@CrossOrigin("*")
public class ProprietarioController {
    @Autowired
    private ProprietarioService proprietarioService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Proprietario proprietario) {
        try {
            //msg de ok e msg de erro
            String mensagem = this.proprietarioService.save(proprietario);
            //método ok faz parte do create
//            return new ResponseEntity<>(mensagem, HttpStatus.CREATED);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Proprietario proprietario, @PathVariable long id) {
        try {
            String mensagem = this.proprietarioService.update(proprietario, id);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (
                Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        try {
            String mensagem = this.proprietarioService.delete(id);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    //renomeado para o front pq na Aula 16 ele mudou
    //@GetMapping("/findAll")
    @GetMapping("/listAll")
    public ResponseEntity<List<Proprietario>> listAll() {
        try {
            List<Proprietario> lista = this.proprietarioService.listAll();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    //renomeado para o front pq na Aula 18 ele mudou
    //@GetMapping("/findAll/{id}")
    //@GetMapping("/listAll/{id}")
    @GetMapping("/findById/{id}")
    public ResponseEntity<Proprietario> findById(@PathVariable long id) {
        try {
            Proprietario proprietario = this.proprietarioService.findById(id);
            return new ResponseEntity<>(proprietario, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    //Filtro de customização busca "nome"
    @GetMapping("/findByNome")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Proprietario>> findByNome(@RequestParam String nome) {
      try {
            List<Proprietario> lista = this.proprietarioService.findByNome(nome);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    //Filtro de customização busca "marca"
    @GetMapping("/findByProprietario")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Proprietario>> findByProprietario(@RequestParam long idProprietario) {
        try {
            List<Proprietario> lista = this.proprietarioService.findByProprietario(idProprietario);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}



package br.com.app.app.controller;

import br.com.app.app.entity.Acessorio;
import br.com.app.app.service.AcessorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/acessorio")
@CrossOrigin("*")

public class AcessorioController {
    
    @Autowired
    private AcessorioService acessorioService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Acessorio acessorio) {
        try {
            //msg de ok e msg de erro
            String mensagem = this.acessorioService.save(acessorio);
            //método ok faz parte do create
            return new ResponseEntity<>(mensagem, HttpStatus.CREATED);
//            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Acessorio acessorio, @PathVariable long id) {
        try {
            String mensagem = this.acessorioService.update(acessorio, id);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (
                Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
//    public ResponseEntity<String> delete(@PathVariable("id") long id) {
        try {
            String mensagem = this.acessorioService.delete(id);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (
                Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    //renomeado para o front pq na Aula 16 ele mudou
    //@GetMapping("/findAll")
    @GetMapping("/listAll")
    public ResponseEntity<List<Acessorio>> listAll() {
        try {
            List<Acessorio> lista = this.acessorioService.listAll();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //renomeado para o front pq na Aula 18 ele mudou
    //@GetMapping("/findAll/{id}")
    //@GetMapping("/listAll/{id}")
    @GetMapping("/findById/{id}")
    public ResponseEntity<Acessorio> findById(@PathVariable long id) {
//    public ResponseEntity<Acessorio> findById(@PathVariable("id") long id) {
        try {
            Acessorio acessorio = this.acessorioService.findById(id);
            return new ResponseEntity<>(acessorio, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //Filtro de customização busca "nome"
    @GetMapping("/findByNome")
    //Usando um Parâmetro para busca no postman
//    public ResponseEntity<List<Acessorio>> findByNome(@RequestParam String nome) {
    public ResponseEntity<List<Acessorio>> findByNome(@RequestParam("nome") String nome) {
        try {
            List<Acessorio> lista = this.acessorioService.findByNome(nome);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //Filtro de customização busca "marca"
    @GetMapping("/findByAcessorio")
//    @GetMapping("/findByAcessorio/{id}")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Acessorio>> findByAcessorio(@RequestParam long idAcessorio) {
//    public ResponseEntity<List<Acessorio>> findByAcessorio(@RequestParam("id") long idAcessorio) {
        try {
            List<Acessorio> lista = this.acessorioService.findByAcessorio(idAcessorio);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //3° modo com JPQL
    @GetMapping("/findAcimaAno")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Acessorio>> findAcimaAno(@RequestParam int ano) {
        try {
            List<Acessorio> lista = this.acessorioService.findAcimaAno(ano);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}


package br.com.app.app.controller;

import br.com.app.app.entity.Carro;
import br.com.app.app.service.CarroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//Caminho da url escolhida a ser chamada http://localhost:8080/api/carro
//com final save, update/1, delete/1, /findAll, findAll/2,é o método que irá usar/chamar!
//Esse caminho tbm será usado no "cross" do front quando for interligados!!!
@RequestMapping("/api/carro")
//Criando uma integração com o front "cross"
//Onde para estudo e projeto local usando * sem ip de servidor, sem ir para
//produção/deploy. E ir na app.config.ts do front e adicionar na providers
//o provideHttpClient() para as requisições/comunicações/interligar via http
//E fazer + processo de configurações por lá aqui e somente isso!
@CrossOrigin("*")
public class CarroController {

    //Anotação do autowired do spring para não usar o new de instanciação
    //onde a service manda para controller que recebe e envia!
    @Autowired
    private CarroService carroService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Carro carro) {
        try {
            //msg de ok e msg de erro
            String mensagem = this.carroService.save(carro);
            //método ok faz parte do create
            return new ResponseEntity<>(mensagem, HttpStatus.CREATED);
//            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@RequestBody Carro carro, @PathVariable long id) {
        try {
            String mensagem = this.carroService.update(carro, id);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (
                Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        try {
            String mensagem = this.carroService.delete(id);
            return new ResponseEntity<>(mensagem, HttpStatus.OK);
        } catch (
                Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    //renomeado para o front pq na Aula 16 ele mudou
    //@GetMapping("/findAll")
    @GetMapping("/listAll")
    public ResponseEntity<List<Carro>> listAll() {
        try {
            List<Carro> lista = this.carroService.listAll();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //renomeado para o front pq na Aula 18 ele mudou
    //@GetMapping("/findAll/{id}")
    //@GetMapping("/listAll/{id}")
@GetMapping("/findById/{id}")
public ResponseEntity<Carro> findById(@PathVariable long id) {
    try {
        Carro carro = this.carroService.findById(id);
        return new ResponseEntity<>(carro, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}

    //Filtro de customização busca "nome"
    @GetMapping("/findByNome")
    //Usando um Parâmetro para busca no postman
//    public ResponseEntity<List<Carro>> findByNome(@RequestParam String nome) {
    public ResponseEntity<List<Carro>> findByNome(@RequestParam ("nome")String nome) {
        try {
            List<Carro> lista = this.carroService.findByNome(nome);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //Filtro de customização busca "marca"
    @GetMapping("/findByMarca")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Carro>> findByMarca(@RequestParam long idMarca) {
        try {
            List<Carro> lista = this.carroService.findByMarca(idMarca);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    //3° modo com JPQL
    @GetMapping("/findAcimaAno")
    //Usando um Parâmetro para busca no postman
    public ResponseEntity<List<Carro>> findAcimaAno(@RequestParam int ano) {
        try {
            List<Carro> lista = this.carroService.findAcimaAno(ano);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}

// A controller recebe e enviar para a service
//package app.auth;
package br.com.app.app.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SuppressWarnings("ALL")
@RestController
@RequestMapping("/api/login")
//Tira da url publica e seta a original dela ou
// uma personalizada quando for para deploy!
//@CrossOrigin("*")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<String> logar(@RequestBody Login login) {

        try {
            return ResponseEntity.ok(loginService.logar(login));
        } catch (ArithmeticException ex) {
            System.out.println(ex.getMessage());
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}


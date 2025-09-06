//package app.config;
package br.com.app.app.config;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    //TRATAMENTO DE ERROS DE VALIDATIONS
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handle01(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new HashMap<>();
        for (FieldError fildError : ex.getBindingResult().getFieldErrors()) {
            erros.put(fildError.getField(), fildError.getDefaultMessage());
        }
        return new ResponseEntity<Map<String, String>>(erros, HttpStatus.BAD_REQUEST);
    }

    //TRATAMENTO DE ERROS DE VALIDATIONS
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> handle02(ConstraintViolationException ex) {
        Map<String, String> erros = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            erros.put(violation.getPropertyPath().toString(), violation.getMessage());
        }
        return new ResponseEntity<Map<String, String>>(erros, HttpStatus.BAD_REQUEST);
    }

    //TRATAMENTO DOS DEMAIS ERROS DA APLICAÇÃO E DE REGRAS DE NEGÓCIO
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handle03(Exception ex) {
        ex.printStackTrace();
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
//Por enquanto ainda não tem essa classe na aula23
//nem a JwtConfig pq o código dela foi atribuída na class JwtServiceGenerator


package br.com.app.app.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class CarroServiceTest {

    @Autowired
    CarroService carroService;

    //Verificar se é possível registrar um nome Jeep Compass de ano 2006 acima
    //e barra se for abaixo!
    @Test
    void cenario01() {
        boolean retorno = this.carroService.verificarNomeCarro("Jeep Compass", 2006);

        assertEquals(true, retorno);

    }

    //Verifica se se o ano for abaixo de 2006 ele tem que apresentar
    // uma Exception e ele apresentou!
    @Test
    void cenario02() {
        assertThrows(Exception.class, () -> {
            boolean retorno = this.carroService.verificarNomeCarro("Jeep Compass", 1995);

//        assertEquals(true, retorno);
        });
    }

}

/*

Ambos os 2 métodos de teste são Unitários
Classe para teste básico
https://www.youtube.com/watch?v=-d7DizM6aNM&ab_channel=WellingtondeOliveira

Aula 07 Teste Jacoco para teste de cobertura!
https://www.youtube.com/watch?v=eTQmjY4oO_s&ab_channel=WellingtondeOliveira

Testar para o build!

* */
#Versão do jdk usado/instalado no projeto maquina
#FROM openjdk:25-jdk-oracle
#FROM openjdk:17-jdk-slim
# Criando um pasta chamada app
#RUN #mkdir /app
# Mudando para o diretório criado
#WORKDIR /app
# Ele vai pega o arquivo que o mavem criou e colocará nesse
# diretorio tudo que tiver .jar onde irá renomear para app
#COPY target/*.jar /app/app.jar
# Iniciar o projeto
#CMD ["java","-jar","/app/app.jar"]

FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install

FROM openjdk:17-jdk-slim

EXPOSE 8080

COPY --from=build /target/app-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
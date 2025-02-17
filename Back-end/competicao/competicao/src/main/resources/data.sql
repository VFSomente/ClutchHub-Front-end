CREATE TABLE tb_Times (
    id varchar(8) not null primary key,
    nomeSigla VARCHAR(30) NOT NULL,
    pais VARCHAR(25) NOT NULL,
    dataCriacao DATE NOT NULL,
    organizacao VARCHAR(25) NOT NULL,
    jogadores varchar(500) not null
);


create table tb_Usuario (
    id varchar (8) not null primary key,
    nickname varchar(30) not null,
    email varchar(50) not null,
    senha varchar(25) not null
);

create table tb_Participante (
    id varchar(8) not null primary key,
    nickname varchar(30) not null,
    email varchar(50) not null,
    senha varchar(25) not null,
    idade numeric(2) not null,
    times varchar(30) not null
);

create table tb_Organizador(
    id varchar(8) not null primary key,
    nomeCompleto varchar(50) not null,
    email varchar(50) not null,
    senha varchar(25) not null,
    torneios varchar(500) not null
);
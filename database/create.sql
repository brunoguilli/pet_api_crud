create schema pet;

-- Script de criação das tabelas
create table pet_owner (
    cpf varchar primary key,
    nome text not null,
    data_nascimento date,
    sexo char(1) not null
)
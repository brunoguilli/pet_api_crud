create schema pet;

-- Script de criação das tabelas
-- Table Definition ----------------------------------------------

CREATE TABLE pet_owner (
    cpf character varying(11) PRIMARY KEY,
    nome text NOT NULL,
    data_nascimento date,
    sexo character(1) NOT NULL
);

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    descricao text NOT NULL
);

CREATE TABLE pet (
    id SERIAL PRIMARY KEY,
    tipo_animal integer REFERENCES animals(id),
    nome text NOT NULL,
    data_nascimento date,
    sexo character(1) NOT NULL,
    raca character varying(30)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX pet_owner_pkey ON pet_owner(cpf text_ops);

CREATE UNIQUE INDEX animals_pkey ON animals(id int4_ops);

CREATE UNIQUE INDEX pet_pkey ON pet(id int4_ops);
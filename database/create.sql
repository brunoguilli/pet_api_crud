-- Table Definition ----------------------------------------------

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    descricao text NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX animals_pkey ON animals(id int4_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    cpf character varying(11) UNIQUE,
    nome text NOT NULL,
    data_nascimento date,
    sexo character(1) NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX owners_pkey ON owners(id int4_ops);
CREATE UNIQUE INDEX owners_cpf_key ON owners(cpf text_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE pet (
    id integer DEFAULT nextval('pet_id_seq1'::regclass) PRIMARY KEY,
    tipo_animal integer REFERENCES animals(id),
    nome text NOT NULL,
    data_nascimento date,
    sexo character(1) NOT NULL,
    raca character varying(30)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX pet_pkey1 ON pet(id int4_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE pets (
    id integer DEFAULT nextval('pet_id_seq'::regclass) PRIMARY KEY,
    tipo_animal integer REFERENCES animals(id),
    nome text NOT NULL,
    data_nascimento date,
    sexo character(1) NOT NULL,
    raca character varying(30)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX pet_pkey ON pets(id int4_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE pet_owner (
    id SERIAL PRIMARY KEY,
    owner_id integer REFERENCES owners(id),
    pet_id integer UNIQUE REFERENCES pets(id)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX pet_owner_pkey ON pet_owner(id int4_ops);
CREATE UNIQUE INDEX pet_owner_pet_id_key ON pet_owner(pet_id int4_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE user_pet_api (
    id SERIAL PRIMARY KEY,
    username character varying(30),
    user_password character varying(30),
    permission character(1),
    token_expires integer
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX user_pet_api_pkey ON user_pet_api(id int4_ops);

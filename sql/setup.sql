DROP TABLE IF EXISTS insult;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS snacks;
DROP TABLE IF EXISTS pets;

CREATE TABLE insult (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quotes VARCHAR(512) NOT NULL
);

CREATE TABLE favorites (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(512) NOT NULL,
    quotes VARCHAR(512) NOT NULL
);

CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drinkname VARCHAR(512) NOT NULL,
    drinktime VARCHAR(512) NOT NULL
);

CREATE TABLE snacks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    snackname VARCHAR(512) NOT NULL,
    snacktime VARCHAR(512) NOT NULL
);

CREATE TABLE pets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    petname VARCHAR(512) NOT NULL,
    nickname VARCHAR(512) NOT NULL
);
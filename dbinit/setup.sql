CREATE DATABASE IF NOT EXISTS websitedata;

USE websitedata;

DROP TABLE IF EXISTS contactinfo;

DROP TABLE IF EXISTS photoandresume;

DROP TABLE IF EXISTS posts;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS projects;


CREATE TABLE contactinfo (
    contactinfo_id int NOT NULL AUTO_INCREMENT,
    fullname       varchar(450) NOT NULL,
    email           varchar(450) NOT NULL,
    phonenumber     varchar(450) NOT NULL,
    message         varchar(5000) NOT NULL,
    status          varchar(450) NOT NULL,
    date            varchar(450) NOT NULL,
    time            varchar(450) NOT NULL,
    PRIMARY KEY (contactinfo)
)


CREATE TABLE photoandresume (
    id int NOT NULL AUTO_INCREMENT,
    item      VARCHAR(500) NOT NULL,
    PRIMARY KEY (id)
)



CREATE TABLE posts (
    posts_id int NOT NULL AUTO_INCREMENT,
    title       varchar(450) NOT NULL,
    blogposts           varchar(450) NOT NULL,
    author     varchar(450) NOT NULL,
    date        varchar(500) NOT NULL,
    time            varchar(450) NOT NULL,
    PRIMARY KEY (posts_id)
)


CREATE TABLE projects (
    projects_id int NOT NULL AUTO_INCREMENT,
    nameOfProject       varchar(450) NOT NULL,
    projectDescription          varchar(450) NOT NULL,
    date        varchar(500) NOT NULL,
    time            varchar(450) NOT NULL,
    PRIMARY KEY (projects_id)
)


CREATE TABLE users (
    users_id int NOT NULL AUTO_INCREMENT,
    email      varchar(450) NOT NULL,
    password         varchar(450) NOT NULL,
    PRIMARY KEY (users_id)
)
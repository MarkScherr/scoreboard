DROP DATABASE IF EXISTS scoreboard;

CREATE DATABASE scoreboard;

USE scoreboard;

CREATE TABLE user (
	user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50)
);

CREATE TABLE played (
    played_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    is_win BOOLEAN NOT NULL,
    is_foosball BOOLEAN NOT NULL,
    points_for INT NOT NULL,
    points_against INT NOT NULL
);
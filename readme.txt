-- SQL to create the database and table for movie reviews
-- Add initial data after creating the table

-- Create database
CREATE DATABASE movie_reviews;

-- Use the database
USE movie_reviews;

-- Create movies table
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    description TEXT,
    rating DECIMAL(3, 2)
);

-- Insert initial data
INSERT INTO movies (title, release_year, genre, description, rating) VALUES
('Inception', 2010, 'Sci-Fi', 'A mind-bending thriller by Christopher Nolan.', 8.8),
('Titanic', 1997, 'Romance', 'A timeless love story on the ill-fated Titanic.', 7.8),
('The Dark Knight', 2008, 'Action', 'Batman battles the Joker in Gotham City.', 9.0);

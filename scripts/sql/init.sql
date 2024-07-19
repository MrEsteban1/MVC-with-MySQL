CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	title VARCHAR(255) NOT NULL,
	year INT NOT NULL,
	director VARCHAR(255) NOT NULL,
	duration INT NOT NULL,
	poster TEXT,
	rate DECIMAL(2,1) NOT NULL
) 

CREATE TABLE genre {
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE
}

CREATE TABLE movie_genres (
	movie_id BINARY(16) REFERENCES movies(id),
	genre_id INT REFERENCES genres(id),
	PRIMARY KEY (movie_id, genre_id)
)

INSERT INTO movie (id, title, year, director, duration,poster, rate ) VALUES
(UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 180, "")
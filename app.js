const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your database username
  password: '12345678', // replace with your database password
  database: 'movie_review'
});

db.connect((err) => {
  if (err) {
    console.error('Could not connect to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

app.get('/', (req, res) => {
  const { genre, rating } = req.query;
  let query = 'SELECT * FROM movies';
  let queryParams = [];

  if (genre) {
    query += ' WHERE genre = ?';
    queryParams.push(genre);
  }

  if (rating) {
    query += genre ? ' AND rating >= ?' : ' WHERE rating >= ?';
    queryParams.push(rating);
  }

  query += ' ORDER BY genre, rating DESC'; // Sorting by genre and rating (descending)

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching movies from the database.');
    }
    res.render('index', { movies: results, body: 'index' });
  });
});



app.get('/new', (req, res) => {
  res.render('new', { body: 'new' }); // Pass dynamic body to layout.ejs
});

app.post('/new', (req, res) => {
  const { title, release_year, genre, description, rating } = req.body;

  if (!title || !description) {
    return res.status(400).send('Title and Description are required.');
  }

  if (rating < 0 || rating > 10) {
    return res.status(400).send('Rating must be between 0 and 10.');
  }

  const query = 'INSERT INTO movies (title, release_year, genre, description, rating) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [title, release_year, genre, description, rating], (err) => {
    if (err) {
      console.error('Error during database query:', err);  // Log the error
      return res.status(500).send('Error adding the movie to the database.');
    }
    res.redirect('/');
  });
});





app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

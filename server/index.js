const express = require('express');
const bodyParser = require('body-parser');
const bc = require('./controllers/books_controller.js');

const app = express();

app.use( bodyParser.json() );
app.use( express.static( __dirname + "/../build") );

app.get('/api/books', bc.read);
app.post('/api/books', bc.create);
app.put('/api/books/:id', bc.update);
app.delete('/api/books/:id', bc.delete)

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
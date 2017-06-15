const express = require('express');
const bodyParser = require('body-parser');
const bc = require( __dirname + '/controllers/books_controller');

const app = express();

app.use( bodyParser.json() );
app.use( express.static( __dirname + "/../public/build") );

const baseURL = "/api/books";
app.post(baseURL, bc.create);
app.get(baseURL, bc.read);
app.put(`${baseURL}/:id`, bc.update);
app.delete(`${baseURL}/:id`, bc.delete);

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
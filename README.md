<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we will create a node server that will act as a bookshelf. This server will keep track of books by being able to add books to a collection, read from the collection, update the collection, and delete from the collection. We'll use postman to test our endpoints.

## Setup

* `Fork` this repository.
* `Clone` your `fork`.

## Step 1

### Summary

In this step, we will create a package.json to keep track of our server's packages.

### Instructions

* Run `npm init -y`.

### Solution

<img src="https://github.com/DevMountain/node-1-mini/blob/solution/readme-assets/1g.gif" />

## Step 2

### Summary

In this step, we will install the most common packages you'll use when making a node server.

### Instructions

* Run `npm install --save express body-parser`

### Solution

<img src="https://github.com/DevMountain/node-1-mini/blob/solution/readme-assets/2g.gif" />

## Step 3

In this step, we will create a `.gitignore` file to ignore the `node_modules` folder `npm install` created.

### Instructions

* Create a `.gitignore` file in the root of the project.
* Add `node_modules` on the first line and save the file.

### Solution

<details>

<summary> <code> .gitignore </code> </summary>

```
node_modules
```

</details>

## Step 4

In this step, we will create our server and have it listen on port `3000`.

### Instructions

* In the root of the directory create a folder called `server`.
* Create an `index.js` file in `server/`.
* Open `server/index.js`.
* Require `express` in a variable called `express` and require `body-parser` in a variable called `bodyParser`.
* Create a variable called `app` that equals `express` invoked. 
* Call the `use` method on app and pass in `bodyParser`'s `json` method invoked.
* Call the `listen` method on app. The app should listen on port 3000:
  * The first parameter of `listen` is the port number.
  * The second parameter of `listen` is a function that is called when the app starts listening.

### Solution

<details>

<summary> <code> server/index.js </code> </summary>

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.json() );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
```

</details>

## Step 5

### Summary

In this step, we will create a controller that keeps track of the book collection and has methods that can create books, read books, update books, and delete books.

### Instructions

* Create a folder in `server/` called `controllers`.
* In `server/controllers/` create a file called `books_controller.js`.
* Open `server/controllers/books_controller.js`.
* Create a variable called `books` that equals an empty array.
  * A book will be an object that has an `id`, `title`, and `author` property.
* Create a variable called `id` that equals `0`.
  * After a creation of a book, we will increment this by `1` to insure no books have the same `id`.
* Use `module.exports` to export an object.
* On the object create a method called `create`, another called `read`, another called `update`, and another called `delete`.
  * Create - This method should be able to add a new book to the collection using the `request body`.
  * Read - This method should return all books in the collection.
  * Update - This method should be able to update a book by an id from the `request query parameters`.
  * Delete - This method should be able to delete a book by an id from the `request query parameters`.
* All methods should return the entire books array.

### Solution

<details>

<summary> <code> server/controller/books_controller.js </code> </summary>

```js
let books = [];
let id = 0;

module.exports = {
  create: ( req, res ) => {
    const { title, author } = req.body;
    books.push( { id, title, author } );
    id++;
    res.status(200).send( books );
  },

  read: ( req, res ) => {
    res.status(200).send( books );
  },

  update: ( req, res ) => {
    const updateID = req.params.id;
    let index = books.findIndex( book => book.id == updateID );

    books[ index ] = {
      id: books[ index ].id,
      title: req.body.title || books[ index ].title,
      author: req.body.author || books[ index ].author
    };

    res.status(200).send( books );
  },

  delete: ( req, res ) => {
    const deleteID = req.params.id;
    bookID = books.findIndex( book => book.id == deleteID );
    books.splice( bookID, 1 );
    res.status(200).send( books );
  }
};
```

</details>

<br />

## Step 6

### Summary

In this step, we will import our controller into `server/index.js` and create routes that use the methods on the controller.

When creating a route you can use the `post`, `get`, `put`, and `delete` methods on app. The first argument is the URL of the request and the second argument is what function to execute when that URL is hit.

We will also fire up the server to make sure everything has been corrected correctly and that there are no syntax errors.

### Instructions

* Open `server/index.js`.
* Require the books controller under the router in a variable called `bc`.
* Above `port` create four routes on `app`:
  * `post` - `/api/books`, `bc.create`.
  * `get` - `/api/books`, `bc.read`.
  * `put` - `/api/books/:id`, `bc.update`.
  * `delete` - `/api/books/:id`, `bc.delete`
* Run `nodemon` or `node index.js` when in the `server/` directory.

### Solution

<details>

<summary> <code> server/index.js </code> </summary>

```js
const express = require('express');
const bodyParser = require('body-parser');
const bc = require(__dirname + '/controllers/books_controller.js');

const app = express();

app.use( bodyParser.json() );

const baseURL = "/api/books";
app.post(baseURL, bc.create);
app.get(baseURL, bc.read);
app.put(`${baseURL}/:id`, bc.update);
app.delete(`${baseURL}/:id`, bc.delete);

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
```

</details>

<img src="https://github.com/DevMountain/node-1-mini/blob/solution/readme-assets/3g.gif" />

## Step 7

### Summary

In this step, we will use Postman Unit Tests to test our endpoints.

### Instructions

* Restart the API.
* Open Postman.
* Click on the `Import` button and then click on `Choose Files`.
* Select the `postman_collection` file from the root of the project.
* Click on the arrow next to the `node_introduction` collection and click on `Run`.
* In the new Postman window make sure `node_introduction` is highlighted in orange and then press `Start Test`.

### Solution

<img src="https://github.com/DevMountain/node-1-mini/blob/solution/readme-assets/4g.gif" />

## Step 8

### Summary

In this step, we will use `express.static` to serve up our `index.html` file. `express.static` takes an argument that is the folder location you want to serve when the server URL is hit in a browser. Our front-end was made using `create-react-app` which has a production ready build. We'll want to server the entire `public/build` folder.

### Instructions

* Call the `use` method on app and pass in `express.static( __dirname + '/../public/build')`.
* Add some books to your collection using Postman.
* Open up `http://localhost:3000` in your browser.

### Solution

<details>

<summary> <code> server/index.js </code> </summary>

```js
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
```

</details>

<br />

<img src="https://github.com/DevMountain/node-1-mini/blob/solution/readme-assets/5g.gif" />

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>

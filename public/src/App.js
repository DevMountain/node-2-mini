import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      title: '',
      author: '',
      showId: ''
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    axios.get( `/api/books` )
    .then( response => {
      this.setState({ books: response.data });
    });
  }

  addBook = (e) => {
    e.preventDefault();
    axios.post('/api/books', {title: this.title.value, author: this.author.value}).then(res => {
      this.setState({
        books: res.data
      })
      this.title.value = '';
      this.author.value = '';
    })
  }

  deleteBook = (id) => {
    axios.delete(`/api/books/${id}`).then(res => {
      this.setState({
        books: res.data
      })
    })
  }

  updateBook = (id, title, author) => {
    let book = {
      title: this.state.title, 
      author: this.state.author
    }
    axios.put(`/api/books/${id}`, book).then(res => {
      this.setState({
        books: res.data,
        showId: '',
        author: '',
        title: ''
      })
    })
  }

  render() {

    let books = this.state.books.map( (book, i) => (
      <div key={i + book.title} 
        style={{
          display: 'flex',
          'justify-content': 'space-evenly',
          height: '30px',
          margin: '5px',
          'align-items': 'center'}}> 
        <h3>Title:</h3>
        {
          this.state.showId !== book.id ?
          <p>{ book.title }</p> :
          <input type="text" placeholder={book.title} onChange={(e) => this.setState({title: e.target.value})}/>
        }
        <h3>Author:</h3>    
        { 
          this.state.showId !== book.id ?
          <p>{ book.author }</p> :
          <input type="text" placeholder={book.author} onChange={(e) => this.setState({author: e.target.value})}/> 
        }
        {
          this.state.showId !== book.id ?
          <button onClick={() => this.setState({showId: book.id})}>Update Book</button> :
          <button onClick={() => this.updateBook(book.id)}>Save Update</button>
        }
        <button onClick={() => this.deleteBook(book.id)}>Delete Book</button>
      </div>
    ))

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
        <form action="submit" onSubmit={this.addBook}>
          <input type="text" placeholder='Book Title' ref={(input) => this.title = input}/>
          <input type="text" placeholder='Book Author' ref={(input) => this.author = input}/>
          <button type='submit'>Add Book</button>
        </form>
          <h2> Books: </h2>
          {
            books
          }
        </div>
      </div>
    );
  }
}

export default App;

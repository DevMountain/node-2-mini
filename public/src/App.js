import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    axios.get( `http://localhost:3000/api/books` )
    .then( response => {
      this.setState({ books: response.data });
    });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <p> Books: </p>
          {
            books.map( book => (
              <div> 
                <span>Title: { book.title } | Author: { book.author }</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;

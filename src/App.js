import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './routes/Search'
import BoxOffice from './routes/BoxOffice'
import Navigation from './components/holded_components/Navigation'
import Header from './components/holded_components/Header'
import Footer from './components/holded_components/Footer'
import Register from './routes/Register'
import Main from './routes/Main'
import Login from './routes/Login'
import Board from './routes/Board'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header/>
          <Navigation />
          <div className="screen">
            <Route exact path = "/" component = {Main}/>
            <Route path="/search" component={Search} />
            <Route path = "/boxOffice" component = {BoxOffice}/>
            <Route path = "/register" component = {Register}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/board" component = {Board}/>
          </div>
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
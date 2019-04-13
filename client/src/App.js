import React, { Component } from 'react';

import './App.css';
import Display from './components/Display';
import Dashboard from './components/Dashboard';

class App extends Component {
  state = {
    balls: 0,
    strikes: 0,
  }

  ballsHandler = () => {
    this.setState({balls: this.state.balls + 1});
  }

  strikesHandler = () => {
    this.setState({strikes: this.state.strikes + 1});
  }


  render() {
    return (
      <>
        <h3>Baseball</h3>
        <Display balls={this.state.balls} strikes={this.state.strikes} />
        <Dashboard ballsHandler={this.ballsHandler} strikesHandler={this.strikesHandler} />
      </>
    );
  }
}

export default App;

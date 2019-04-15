import React, { Component } from "react";

import "./App.css";
import Display from "./components/Display";
import Dashboard from "./components/Dashboard";

class App extends Component {
  state = {
    balls: 0,
    strikes: 0
  };

  ballsHandler = () => {
    const { balls } = this.state;
    if (balls < 3) {
      this.setState({ balls: this.state.balls + 1 });
    } else {
      this.setState({ balls: 0 });
    }
  };

  strikesHandler = () => {
    const { strikes } = this.state;
    if (strikes < 2) {
      this.setState({ strikes: this.state.strikes + 1 });
    } else {
      this.setState({ strikes: 0 });
    }
  };

  foulHandler = () => {
    const { strikes } = this.state;
    if (strikes < 2) {
      this.setState({ strikes: this.state.strikes + 1 });
    }
  };

  hitHandler = () => {
    this.setState({ balls: 0, strikes: 0 });
  };

  render() {
    return (
      <>
        <h3>Scoreboard</h3>
        <Display balls={this.state.balls} strikes={this.state.strikes} />
        <Dashboard
          ballsHandler={this.ballsHandler}
          strikesHandler={this.strikesHandler}
          foulHandler={this.foulHandler}
          hitHandler={this.hitHandler}
        />
      </>
    );
  }
}

export default App;

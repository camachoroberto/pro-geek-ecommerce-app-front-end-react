import React, { Component } from 'react';
import '../css/main.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="background">
        <h1 className="blue">BLUE COLOR</h1>
        <h1 className="dark-blue">DARK BLUE COLOR</h1>
        <h1 className="light-blue">LIGHT BLUE COLOR</h1>
        <h1 className="black-color">BLACK COLOR</h1>
        <h1 className="white-color">WHITE COLOR</h1>
      </div>
    );
  }
}

export default App;

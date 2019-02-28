import React, { Component } from 'react';
import '../css/main.scss';
import NavBar from './navbar/Navbar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="body">
        <NavBar />
      </div>
    );
  }
}

export default App;

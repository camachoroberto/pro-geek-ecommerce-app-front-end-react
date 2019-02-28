import React, { Component } from 'react';
import '../css/main.scss';
import NavBar from './navbar/Navbar.jsx';
import Form from './form/Form.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="body">
        <NavBar />
        <Form name username password />
      </div>
    );
  }
}

export default App;

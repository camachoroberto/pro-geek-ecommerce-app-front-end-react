import React, { Component } from 'react';
import '../css/main.scss';
import NavBar from './navbar/Navbar.jsx';
import Form from './form/Form.jsx';
import Counter from './counter/Counter.jsx'

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
        <Counter />

      </div>
    );
  }
}

export default App;

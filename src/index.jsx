import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';

require('webpack-icons-installer/google');

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('root'));

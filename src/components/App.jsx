import React, { Component } from 'react';
import axios from 'axios';
import CategoryList from './categorylist/CategoryList.jsx';
import '../css/main.scss';
import NavBar from './navbar/Navbar.jsx';
import Form from './form/Form.jsx';
import Counter from './counter/Counter.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios.get('https://pro-geek-ecommerce-api.herokuapp.com/categories')
      .then((response) => {
        const categories = response.data.response;
        this.setState({ categories }, () => {
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div className="body">
        <NavBar />
        <CategoryList categories={this.state.categories} />
        <Form name username password />
        <Counter />

      </div>
    );
  }
}

export default App;

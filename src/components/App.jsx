import React, { Component } from 'react';
import axios from 'axios';
import CategoryList from './categorylist/CategoryList.jsx';
import '../css/main.scss';

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
      <div>
        <CategoryList categories={this.state.categories} />
      </div>
    );
  }
}

export default App;

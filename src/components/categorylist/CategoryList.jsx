import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoryList extends Component {
  listMount() {
    const { categories } = this.props;
    return categories.map((element, idx) => <div key={idx}><Link className="list-item" to={`/categories/${element._id}`}>{element.name}</Link></div>);
  }

  render() {
    return (
      <div className="list-container">
        {this.listMount()}
      </div>
    );
  }
}

export default CategoryList;

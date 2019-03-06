import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

class CategoryList extends Component {
  listMount() {
    const { categories, check } = this.props;

    const NavBar = categories.map((element, idx) => <div key={idx}><Link className="list-item" to={`/categories/${element._id}`}>{element.name}</Link></div>);

    const CheckBox = categories.map((element, idx) => (
      <div key={idx}>
        <Form.Check type="checkbox" label={element.name} />
      </div>
    ));

    if (check) {
      return CheckBox;
    }
    return NavBar;
  }

  render() {
    return (
      <div className="list-container category-bg">
        {this.listMount()}
      </div>
    );
  }
}

export default CategoryList;

import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const CategoryList = ({ categories, check }) => {
  const listMount = () => {
    const NavBar = categories.map((element, idx) => (<div key={idx}><Link className="list-item" to={`/categories/${element._id}`}>{element.name}</Link></div>));
    const CheckBox = categories.map((element, idx) => (
      <div key={idx}>
        <Form.Check type="checkbox" label={element.name} />
      </div>
    ));
    if (check) {
      return CheckBox;
    }
    return NavBar;
  };

  return (
    <div className="list-container category-bg">
      {listMount()}
    </div>
  );
};

export default CategoryList;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Edit from './Edit.jsx';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.categoriesList = this.categoriesList.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  categoriesList() {
    const { categories } = this.props;
    return categories.map(category => (
      <tr>
        <td>{category.name}</td>
        <td>
          <button type="button" onClick={() => this.handleShow()} className="btn ButtonCardP">edit</button>
        </td>
        <td>
          <button type="button" className="btn btn-danger">delete</button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div>
        <Edit handleClose={this.handleClose} show={this.state.show} />
        <div className="cart">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{this.categoriesList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Category;

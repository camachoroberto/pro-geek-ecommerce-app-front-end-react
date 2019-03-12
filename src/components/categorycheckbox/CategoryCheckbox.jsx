import React, { Component } from 'react';

class CategoryCheckbox extends Component {
  constructor() {
    super();
    this.state = {
      id: ''
    };
    this.checkHandleChange = this.checkHandleChange.bind(this);
  }

  componentDidMount() {
    const { name } = this.props;
    this.setState( { name } );
  }

  checkHandleChange(e) {
    const { id, checked } = e.currentTarget;
    const { updateCategories } = this.props;
    updateCategories(id, checked);
  }

  render() {
    const { id, name, check } = this.props;
    return (
      <div>
        <input type="checkbox" name={id} id={id} checked={check} onChange={e => this.checkHandleChange(e)} />
        <label htmlFor={id} name={id}>{name}</label>
      </div>
    );
  }
}

export default CategoryCheckbox;

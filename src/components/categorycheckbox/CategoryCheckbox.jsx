import React, { Component } from 'react';

class CategoryCheckbox extends Component {
  constructor() {
    super();
    this.state = {
      id: ''
    };
    this.checkHandleChange = this.checkHandleChange.bind(this)
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
    const { id, name, checkHandleChange } = this.props;
    return (
      <div>
        <label name={id}>{name}</label>
        <input type="checkbox" name={id} id={id} onChange={e => this.checkHandleChange(e)} />
      </div>
    );
  }
}

export default CategoryCheckbox;
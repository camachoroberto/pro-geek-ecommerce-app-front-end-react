import React, { Component } from 'react';

class CategoryCheckbox extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    const { name } = this.props;
    this.setState( { name } );
  }

  render() {
    const { name, change } = this.props
    return (
      <div>
        <input type="checkbox" name={name} onChange={e => change(e)} />
      </div>
    );
  }
}

export default CategoryCheckbox;
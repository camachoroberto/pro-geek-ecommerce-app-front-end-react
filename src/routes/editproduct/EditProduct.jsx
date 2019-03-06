import React, { Component } from 'react';

class EditProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: '',
      leadTime: '',
      image: [],
      description: '',
      material: '',
      height: '',
      manufacturer: '',
      category: {}
    };
  }

  componentWillMount() {
    const { name, price, leadTime, image, description, material, height, manufacturer, category } = this.props;
    this.setState({ name, price, leadTime, image, description, material, height, manufacturer, category });
  }
}

export default EditProduct;

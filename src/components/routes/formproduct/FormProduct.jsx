import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import InputForm from '../../inputform/InputForm.jsx';
import CategoryCheckbox from '../../categorycheckbox/CategoryCheckbox.jsx';

let newArr = [];

class FormProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: '',
      leadTime: '',
      image: '',
      description: '',
      material: '',
      height: '',
      manufacturer: '',
      category: []
    };
    this.handleText = this.handleText.bind(this);
    this.listCategories = this.listCategories.bind(this);
    this.checkHandleChange = this.checkHandleChange.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
  }

  handleText(e) {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  checkHandleChange(e) {
    const category = this.state.category;
    const { name, checked } = e.currentTarget;
    console.log('checked', checked);
    if (checked) {
      newArr.push(name);
      console.log('newArr True', newArr);
    } else {
      newArr = newArr.filter(item => !item.includes(name));
      console.log('newArr false', newArr);
    }
    this.setState({ category: newArr }, () => {
      console.log('category', category);
    });
  }

  listCategories() {
    return this.props.categories.map((element, idx) => <div key={idx}><CategoryCheckbox name={element.name} change={this.checkHandleChange} /></div>);
  }

  saveProduct(e) {
    e.preventDefault();
    const { name, price, leadTime, image, description, material, height, manufacturer, category } = this.state;
    axios.post('http://localhost:8080/products', { name, price, leadTime, image, description, material, height, manufacturer, category })
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Form onSubmit={e => this.saveProduct(e)}>
        <InputForm labelText="Product Name" type="text" name="name" placeholder="Enter product name" value={this.state.name} change={this.handleText} />
        <InputForm labelText="Product Description" type="text" as="textarea" name="description" placeholder="Enter product description" value={this.state.description} change={this.handleText} />
        <InputForm labelText="Product Price" type="number" name="price" placeholder="Enter product price" value={this.state.price} change={this.handleText} />
        <InputForm labelText="Delivery Lead Time" type="number" name="leadTime" placeholder="Enter product lead time" value={this.state.leadTime} change={this.handleText} />
        <InputForm labelText="Product Photo" type="file" name="image" placeholder="Select a very nice photo" value={this.state.image} change={this.handleText} />
        <InputForm labelText="Material" type="text" name="material" placeholder="Describe product material" value={this.state.material} change={this.handleText} />
        <InputForm labelText="Product Height" type="number" name="height" placeholder="Enter product height in centimeters" value={this.state.height} change={this.handleText} />
        <InputForm labelText="Manufacturer" type="text" name="manufacturer" placeholder="Enter product manufacturer" value={this.state.manufacturer} change={this.handleText} />
        <Form.Group controlId="formBasicChecbox">
          {this.listCategories()}
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </Form>
    );
  }
}

export default FormProduct;

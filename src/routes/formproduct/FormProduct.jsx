import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import InputForm from '../../inputform/InputForm.jsx';
import CategoryCheckbox from '../../categorycheckbox/CategoryCheckbox.jsx';
import FileUpload from '../../auth/service/file-upload.jsx';

class FormProduct extends Component {
  constructor(props) {
    super(props);
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
    this.handleText = this.handleText.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.listCategories = this.listCategories.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
  }

  handleText(e) {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  handleFileUpload(e) {
    const { image } = this.state;
    console.log('The file to be uploaded is: ', e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append('image', e.target.files[0]);
    FileUpload.handleUpload(uploadData)
      .then((response) => {
        this.setState({ image: image.push(response.secure_url) });
      })
      .catch((err) => {
        console.log('Error while uploading the file: ', err);
      });
  }

  updateCategories(id, checked) {
    const { category } = this.state;
    if (checked) {
      this.setState({ category: Object.assign(category, { [id]: id }) });
    } else {
      this.setState({ category: Object.assign({}, delete category[id], category) });
    }
  }

  listCategories() {
    const { categories } = this.props;
    return categories.map(element => <div key={element._id}><CategoryCheckbox id={element._id} updateCategories={this.updateCategories} name={element.name} /></div>);
  }

  saveProduct(e) {
    e.preventDefault();
    const { name, price, leadTime, image, description, material, height, manufacturer, category } = this.state;
    const categoryArray = Object.keys(category);
    axios.post('http://localhost:8080/products', { name, price, leadTime, image, description, material, height, manufacturer, category: categoryArray })
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
        <input type="file" onChange={e => this.handleFileUpload(e)} />
        <InputForm labelText="Material" type="text" name="material" placeholder="Describe product material" value={this.state.material} change={this.handleText} />
        <InputForm labelText="Product Height" type="number" name="height" placeholder="Enter product height in centimeters" value={this.state.height} change={this.handleText} />
        <InputForm labelText="Manufacturer" type="text" name="manufacturer" placeholder="Enter product manufacturer" value={this.state.manufacturer} change={this.handleText} />
        <Form.Group controlId="formBasicChecbox">
          {this.listCategories()}
        </Form.Group>
        <Button variant="primary" type="submit" className="ButtonPG">
          Create Product
        </Button>
      </Form>
    );
  }
}

export default FormProduct;

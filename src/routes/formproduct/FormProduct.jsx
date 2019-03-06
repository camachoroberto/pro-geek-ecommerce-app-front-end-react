import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import InputForm from '../../components/inputform/InputForm.jsx';
import CategoryCheckbox from '../../components/categorycheckbox/CategoryCheckbox.jsx';
import FileUpload from '../../components/auth/service/file-upload.jsx';

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
    this.listImages = this.listImages.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  handleText(e) {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  }

  handleFileUpload(e) {
    const { image } = this.state;
    if (image.length < 5) {
      const uploadData = new FormData();
      uploadData.append('image', e.target.files[0]);
      FileUpload.handleUpload(uploadData)
        .then((response) => {
          image.push(response.secure_url);
          this.setState({ image });
          console.log(image);
        })
        .catch((err) => {
          console.log('Error while uploading the file: ', err);
        });
    } else {
      alert('Max number of uploads reached.');
    }
    e.currentTarget.value = '';
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

  listImages() {
    const { image } = this.state;
    return image.map((element, idx) => <div key={idx}><img src={element} alt="product images" width="100" onClick={e => this.deleteImage(e)} /></div>);
  }

  deleteImage(e) {
    const { image } = this.state;
    const filtered = image.filter((el => el !== e.currentTarget.src));
    this.setState({ image: filtered });
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
        <div>
          <input type="file" onChange={e => this.handleFileUpload(e)} />
          {this.listImages()}
        </div>
        <InputForm labelText="Product Name" type="text" name="name" placeholder="Enter product name" value={this.state.name} change={this.handleText} />
        <InputForm labelText="Product Description" type="text" as="textarea" name="description" placeholder="Enter product description" value={this.state.description} change={this.handleText} />
        <InputForm labelText="Product Price" type="number" name="price" placeholder="Enter product price" value={this.state.price} change={this.handleText} />
        <InputForm labelText="Delivery Lead Time" type="number" name="leadTime" placeholder="Enter product lead time" value={this.state.leadTime} change={this.handleText} />
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

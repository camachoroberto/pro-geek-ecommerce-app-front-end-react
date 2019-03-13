import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Counter from '../../components/counter/Counter.jsx';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
    this.plus1 = this.plus1.bind(this)
    this.minus1 = this.minus1.bind(this)
  }

  plus1() {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  }

  minus1() {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState({ counter: counter - 1 });
    }
  }

  render() {
    const { addCart, product, counterCart, addTotal } = this.props;
    const { counter } = this.state;
    const id = product._id;
    const total = counter + (counterCart || 0);
    const subtotal = counter * product.price;
    console.log('product', product)
    return (
      <div className="containerRowB">
        <div className="containerCol margin">

          <img className="margin" src={product.image[0]} alt={product.name} />

          <div className="containerRowB">
            <img className="margin" src={product.image[1]} alt={product.name} />
            <img className="margin" src={product.image[2]} alt={product.name} />
          </div>

          <div className="containerRowB">
            <img className="margin" src={product.image[3]} alt={product.name} />
            <img className="margin" src={product.image[4]} alt={product.name} />
          </div>

        </div>

        <div className="containerCol margin">
          <p className="margin fontHeader">{product.name}</p>
          <p>_________________________</p>
          <p className="margin">Price: ${product.price},00</p>
          <div className="containerCol">
            <p>_________________________</p>
            <p className="margin">Description: {product.description} </p>
          </div>
          <p className="margin">Lead Time: {product.leadTime} </p>
          <p className="margin">Material: {product.material} </p>
          <p className="margin">Height: {product.height} </p>
          <p className="margin">Manufacturer: {product.manufacturer} </p>
          <Counter counter={counter} plus1={this.plus1} minus1={this.minus1} />
          <Button variant="primary" className="ButtonCardP" onClick={() => { addCart({ [id]: total }); addTotal({ [id]: subtotal });}}>BUY</Button>
        </div>
      </div>
    );
  }
}

export default ProductCard;

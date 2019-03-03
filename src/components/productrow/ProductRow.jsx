import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Counter from '../counter/Counter.jsx';

class ProductRow extends Component {
  constructor(props) {
    super(props);
    this.plus1 = this.plus1.bind(this);
    this.minus1 = this.minus1.bind(this);
  }


  plus1() {
    const { addCart, product } = this.props;
    const { counter } = this.props;
    const id = product._id;
    addCart({ [id]: counter + 1 });
  }


  minus1() {
    const { addCart, product } = this.props;
    const { counter } = this.props;
    const id = product._id;
    if (counter > 1) {
      addCart({ [id]: counter - 1 });
    }
  }


  render() {
    const { product, counter, deleteCart } = this.props;
    const total = counter * product.price;
    return (
      <tr>
        <td>{product.image}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td><Counter counter={counter} plus1={this.plus1} minus1={this.minus1} /></td>
        <td>{total}</td>
        <td>
          {' '}
          <Button onClick={() => deleteCart(product._id)} className="material-icons" variant="outline-danger"> delete </Button>
          {' '}
        </td>
      </tr>

    );
  }
}
export default ProductRow;

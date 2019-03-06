import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import Counter from '../counter/Counter.jsx';

class ProductRow extends Component {
  constructor(props) {
    super(props);
    this.plus1 = this.plus1.bind(this);
    this.minus1 = this.minus1.bind(this);
  }


  plus1() {
    const { addCart, product, addTotal } = this.props;
    const { counter } = this.props;
    const id = product._id;
    const total = product.price * (counter + 1);
    addCart({ [id]: counter + 1 });
    addTotal({ [id]: total })
  }


  minus1() {
    const { addCart, product, addTotal } = this.props;
    const { counter } = this.props;
    const id = product._id;
    const total = product.price * (counter - 1);
    if (counter > 1) {
      addCart({ [id]: counter - 1 });
      addTotal({ [id]: total });
    }
  }


  render() {
    const { product, counter, deleteCart } = this.props;
    const total = counter * product.price;
    return (
      <tr>
        <td>{product.image}</td>
        <td>{product.name}</td>
        <td>{product.price.toFixed(2)}</td>
        <td><Counter counter={counter} plus1={this.plus1} minus1={this.minus1} /></td>
        <td >${total.toFixed(2)}</td>
        <td>
          <Button onClick={() => deleteCart(product._id)} className="material-icons" variant="outline-danger"> delete </Button>
        </td>
      </tr>
    );
  }
}
export default ProductRow;

import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import Counter from '../counter/Counter.jsx';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
    this.plus1 = this.plus1.bind(this)
    this.minus1 = this.minus1.bind(this)
  }


  componentDidMount() {
    const { counter } = this.props;
    this.setState({
      counter: (counter || 0)
    })
  }

  plus1() {
    const { counter } = this.state
    this.setState({ counter: counter + 1 })
  }

  minus1() {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState({ counter: counter - 1 })
    }
  }

  render() {
    const { product, addCart, counterCart, addTotal } = this.props;
    const { counter } = this.state;
    const id = product._id;
    const total =  counter + (counterCart||0);
    const subtotal = counter * product.price;
    return (
      <div className="margin10">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">${product.price.toFixed(2)}</Card.Subtitle>
            <Card.Text>
              {product.description.slice(0,30) + '...'}
            </Card.Text>
            <Counter counter={counter} plus1={this.plus1} minus1={this.minus1} />
            <Button variant="primary" className="ButtonCardP" onClick={() => { addCart({ [id]: total }); addTotal({ [id]: subtotal });}}>BUY</Button>
          </Card.Body>
        </Card>
        </div>
    );
  }

}


export default ProductCard;
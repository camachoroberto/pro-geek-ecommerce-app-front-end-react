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

  plus1() {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1,
    })
  }

  minus1() {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState({
        counter: counter - 1
      })
    }
  }

  render() {
    //addCart({[id]: counter})
    const { product, addCart } = this.props;
    const { counter } = this.state;
    const id = product._id;
    return (
      <div className='list-container'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="" />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">${product.price},00</Card.Subtitle>
            <Card.Text>
              {product.description}
            </Card.Text>
            <Counter counter={counter} plus1={this.plus1} minus1={this.minus1} />
          <Button variant="primary" className="ButtonCardP" onClick={ () => addCart({[id]:counter})}>BUY</Button>
            {/* {[id]: counter} */}
          </Card.Body>
        </Card>
      </div>
    );
  }

}


export default ProductCard;
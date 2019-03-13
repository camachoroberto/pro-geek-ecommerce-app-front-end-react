import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Counter from '../../components/counter/Counter.jsx';
import Axios from 'axios';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
    this.plus1 = this.plus1.bind(this);
    this.minus1 = this.minus1.bind(this);
    this.listRating = this.listRating.bind(this);
    this.rating = this.rating.bind(this);
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

  listRating() {
    const { product, user } = this.props;
    return product.rating.map((item) => {
      console.log(item, user, user.role)
      if (item.userId === user._id || user.role === 'Admin') {
        return (
          <div className="card margin">
            <button className="btn btn-danger" onClick={() => { this.deleteComment(item) }}>delete</button>
            <h2>{item.user}</h2>
            <h4>rating: {item.rating}</h4>
            <p>{item.comment}</p>
          </div>
        )
      }
      return (
        <div className="card margin">
          <h2>{item.user}</h2>
          <h4>rating: {item.rating}</h4>
          <p>{item.comment}</p>
        </div>
      )
    })
  }

  rating() {
    const { product } = this.props;

    if (product.rating.length > 0) {
      return (product.rating.reduce((acc, curr) => {
        return acc + curr.rating;
      }, 0)) / product.rating.length;
    }
    return 'Not Available'

  }

  deleteComment(item) {
    const { product } = this.props;
    product.rating.splice(product.rating.indexOf(item), 1);
    Axios({
      method: 'put',
      url: `http://localhost:8080/products/comment/${product._id}`,
      data: {
        rating: product.rating
      }
    })
      .then((res) => {
        localStorage.setItem('productDetail', JSON.stringify(product));
        console.log(res)
      })

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
        <div className="containerCol margin card">

          {product.image[0]
            ? <img className="margin" src={product.image[0]} alt={product.name} />
            : ''
          }


          <div className="containerRowB">
            {product.image[1]
              ? <img className="margin" src={product.image[1]} alt={product.name} />
              : ''
            }
            {product.image[2]
              ? <img className="margin" src={product.image[2]} alt={product.name} />
              : ''
            }
          </div>

          <div className="containerRowB">
            {product.image[3]
              ? <img className="margin" src={product.image[3]} alt={product.name} />
              : ''
            }
            {product.image[4]
              ? <img className="margin" src={product.image[4]} alt={product.name} />
              : ''
            }
          </div>

        </div>

        <div className="containerCol margin card">
          <p className="margin fontHeader">{product.name}</p>
          <div className="margin">Rating: {this.rating()}</div>
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
          <Button variant="primary" className=" margin ButtonCardP" onClick={() => { addCart({ [id]: total }); addTotal({ [id]: subtotal }); }}>BUY</Button>
        </div>
        <div className="card margin">
            <h3 className="margin">Comments</h3>
            {this.listRating()}
        </div>
      </div>
    );
  }
}

export default ProductCard;

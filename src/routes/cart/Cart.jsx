import React, { Component } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const client = {
  sandbox: process.env.CLIENT_ID,
  production: ''
}

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      logState: true,
      address: false
    };
    this.newOrder = this.newOrder.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  newOrder() {
    const { cartRow, cart, cartReset, products, loggedInUser } = this.props;
    const order = [];
    for (let key in cart) {
      products.forEach(element => {
        if (element._id === key) {
          order.push(Object.assign(element, { quantity: cart[key] }))
        }
      });
    }
    if (loggedInUser === false) {
      this.setState({ logState: false });
      return;
    }
    if (loggedInUser.address.street === '' || loggedInUser.address.postalCode === '') {
      this.setState({ address: true })
      return;
    } 
    else {
      Axios({
        method: 'post',
        url: 'http://localhost:8080/orders',
        data: Object.assign({}, { products: order }, { user: { name: loggedInUser.name, address: loggedInUser.address, id: loggedInUser._id } })
      })
        .then(() => {
          cartReset();
          this.setRedirect();
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  render() {
    const { cartRow, cart, total, products, loggedInUser, updateMessage } = this.props
    const totalArr = Object.values(total);
    let subtotal = 0;
    if (!this.state.logState) {
      updateMessage('Login is required to checkout')
      return <Redirect to="/login" />;
    }
    if (this.state.address) {
      return <Redirect to={`/profile/${loggedInUser._id}`} />
    }
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    if (totalArr.length > 0) {
      subtotal = Object.values(total)
        .reduce((acc, cur) => (acc += cur))
        .toFixed(2);
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 table-responsive">
              <table className="table">
                <thead className="class-header">
                  <tr>
                    <td>Product</td>
                    <td />
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>{cartRow()}</tbody>
              </table>
              <Link to="/products"><button type="button" className="btn btn-lg ButtonKeep">Keep Buying</button></Link>
            </div>
            <div className="col-md-5 table-responsive">
              <table className="table">
                <thead className="class-header">
                  <tr>
                    <td className="subtotal">Subtotal</td>
                    <td />
                    <td />
                    <td>${subtotal}</td>
                  </tr>
                </thead>
                <tbody className="containerCol">
                  {/* <button type="button" className="btn btn lightblue btn-lg btn-block" onClick={this.newOrder}> Proceed to checkout</button> */}
                  <PaypalExpressBtn env='sandbox' client={client} currency='BRL' total={parseFloat(subtotal)} onError={() => console.log('Something went wrong')} onSuccess={this.newOrder} onCancel={() => console.log('Purchase canceled by customer')} style={{ size:'large', color: 'blue', shape: 'rect', label: 'checkout' }} />
                </tbody>
              </table>
            </div>
          </div>
          <div className="fillin0" />
        </div>
      );
    }
    return (
      <div className="fillin">
        <div className="containerCol paddinTop">
          <div> Your Shopping Cart is empty.</div>
          <br />
          <br />
          <div className="material-icons"> add_shopping_cart </div>
        </div>
      </div>
    );
  }
}

export default Cart;

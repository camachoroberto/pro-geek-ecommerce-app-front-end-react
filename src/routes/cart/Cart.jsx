import React, { Component } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const client = {
  sandbox: process.env.CLIENT_ID,
  production: ''
};

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      logState: true,
      address: false,
      checkOrder: false
    };
    this.newOrder = this.newOrder.bind(this);
    this.checkOrder = this.checkOrder.bind(this);
    this.displayButton = this.displayButton.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  checkOrder() {
    const { loggedInUser } = this.props;
    if (loggedInUser === false) {
      this.setState({ logState: false });
      return;
    }
    if (loggedInUser.address.street === '' || loggedInUser.address.postalCode === '') {
      this.setState({ address: true })
      return;
    }
    this.setState({ checkOrder: true });
  }

  displayButton() {
    const { total } = this.props
    const subtotal = Object.values(total)
        .reduce((acc, cur) => (acc += cur))
        .toFixed(2);
    if (this.state.checkOrder) {
      return <PaypalExpressBtn env='sandbox' client={client} currency='BRL' total={parseFloat(subtotal).toFixed(2)} onError={() => console.log('Something went wrong')} onSuccess={this.newOrder} onCancel={ () => console.log('Purchase canceled by customer')} style={{ size:'large', color: 'blue', shape: 'rect', label: 'checkout' }} />
    } else {
      return <button type="button" className="btn btn lightblue btn-lg btn-block" onClick={this.checkOrder}> Validate Data</button>
    }
  }

  newOrder() {
    const { cartRow, cart, cartReset, products, loggedInUser, newOrderCheckout } = this.props;
    const order = [];
    for (let key in cart) {
      products.forEach(product => {
        if (product._id === key) {
          order.push(Object.assign(product, { quantity: cart[key] }, { commented: false }))
        }
      });
    } 
    Axios({
      method: 'post',
      url: 'http://localhost:8080/orders',
      data: Object.assign({}, { products: order }, { user: { name: loggedInUser.name, address: loggedInUser.address, id: loggedInUser._id } })
    })
      .then((res) => {
        cartReset();
        this.setState({ checkOrder: false });
        newOrderCheckout(res.data.response._id);
      })
      .then(() => this.setRedirect())
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { cartRow, cart, total, products, loggedInUser, updateMessage } = this.props
    const totalArr = Object.values(total);
    let subtotal = 0;
    if (!this.state.logState) {
      updateMessage('Login is required to checkout');
      return <Redirect to="/login" />;
    }
    if (this.state.address) {
      updateMessage('Address is required to checkout')
      return <Redirect to={`/profile/${loggedInUser._id}`} />;
    }
    if (this.state.redirect) {
      return <Redirect to="/cart/checkout" />;
    }
    if (totalArr.length > 0 ) {
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
                  {this.displayButton()}
                </tbody>
              </table>
            </div>
          </div>
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

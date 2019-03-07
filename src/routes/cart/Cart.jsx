import React from "react";
import { Button, Table, Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Cart = ({ cartRow, cart, total }) => {
  const totalArr = Object.values(total);
  let subtotal = 0;
  if (totalArr.length > 0) {
    subtotal = Object.values(total)
      .reduce((acc, cur) => (acc += cur))
      .toFixed(2);
    return (
      <div className="cart">
        <Row>
          <Col>
            <Table responsive>
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
            </Table>
            <Link to="/products"><button type="button" class="btn btn-lg ButtonKeep">Keep Buying</button></Link>
          </Col>
          <Col md="5">
            <Table responsive>
              <thead className="class-header">
                <tr>
                  <td className="subtotal">Subtotal</td>
                  <td />
                  <td />
                  <td>${subtotal}</td>
                </tr>
              </thead>
              <tbody className="containerCol">
                  <button type="button" class="btn btn lightblue btn-lg btn-block"> Proceed to checkout</button>
              </tbody>
            </Table>
          </Col>
        </Row>
        <div className="fillin0"></div>
      </div>
    );
  } else {
    return (
      <div className="fillin">
        <div className="containerCol paddinTop">
            <div> Your Shopping Cart is empty.</div>
            <br/>
            <br/>
            <div className="material-icons"> add_shopping_cart </div>

        </div>
      </div>
    );
  }
};
export default Cart;

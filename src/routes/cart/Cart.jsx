import React from "react";
import { Button, Table, Row, Col } from "react-bootstrap";

const Cart = ({ cartRow, cart, total }) => {
  const subtotal = Object.values(total).reduce((acc, cur) => acc += cur).toFixed(2);
  return (
    <div className="cart">
      <Row>
        <Col>
          <Table responsive >
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
            <tbody>
              <Button variant="danger">Proceed to checkout</Button>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};
export default Cart;

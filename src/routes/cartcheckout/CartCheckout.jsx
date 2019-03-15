import React from 'react';
import { Link } from 'react-router-dom';

const CartCheckout = ({ newOrder }) => {
  return (
    <div className="mt-5 checkout-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>Thank you for your order! :-)</h1>
            <h2>Your order number is: {newOrder}</h2>
            <p>To follow your order status please visit your profile in "My Orders" page.</p>
            <Link className="btn ButtonPG" to="/profile">Visit My Profile</Link>
          </div>
          <div className="col-md-6">
            <img className="image-checkout" src="https://www.sideshow.com/storage/product-images/903421/iron-man_marvel_silo.png" alt="ironman pic"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;

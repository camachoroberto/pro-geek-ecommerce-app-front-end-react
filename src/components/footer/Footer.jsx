import React from 'react';

const Footer = () => (
  <div className="footer-container ">
    <div className="row footer-container-1">
      <div className="col-md-3 align-center">
        <p><strong className="headerFoot">About Us</strong></p>
        <p className="lb">__________</p>
        <p><a className="footer-links" href="/about-us/who-are-we">Wo are We?</a></p>
        <p><a className="footer-links" href="/about-us/delivery-payment">Delivery & Payment</a></p>
        <p><a className="footer-links" href="/about-us/devolutions-exchanges-policy">Devolutions & Exchanges Policy</a></p>
      </div>

      <div className="col-md-3 align-center">
        <p><strong className="headerFoot">My Account</strong></p>
        <p className="lb">__________</p>
        <p><a className="footer-links" href="/users/:id">My Profile</a></p>
        <p><a className="footer-links" href="/users/:id">My Orders</a></p>
        <p><a className="footer-links" href="/users/:id">My Cart</a></p>
      </div>

      <div className="col-md-3 align-center">
        <p><strong className="headerFoot lb">Contact Information</strong></p>
        <p className="lb">__________</p>
        <p className="lb">Email - atendimento@progeek.com.br</p>
        <p className="lb">Phone - (38) 99145-6183</p>
        <p className="lb">Monday to Friday from 8 to 12 and from 13:30 to 18:00</p>
      </div>

      <div className="col-md-3">
        <div id="fb-root"><div className="fb-page" data-href="https://www.facebook.com/GeekStickersOficial/" data-width="250" data-height="100" data-hide-cover="false" data-show-facepile="false" /></div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-2 side-container" />
      <div className="col-md-8 methods-container footer-bg">
        <h5 className="lb"> Payment & Delivery</h5>
        <img src="./public/images/pagseguro.png" alt="" height="80" />
        <img src="./public/images/correios.png" alt="" height="80" />
      </div>
      <div className="col-md-2 side-container" />
    </div>

    <div className="row">
      <div className="col-md-12 botton-footer">
        <strong className="botton-footer-header lb">  © Pro Geek Limited. All rights reserved</strong>
      </div>
    </div>
  </div>
);

export default Footer;

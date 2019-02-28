import React from 'react';

const Footer = () => (
  <div className="container-fluid footer-container">
    <div className="row footer-container-1">
      <div className="col-md-3">
        <strong className="header">About Us</strong>
        <a className="footer-links" href="/about-us/who-are-we">Who are We?</a>
        <a className="footer-links" href="/about-us/delivery-payment">Delivery & Payment</a>
        <a className="footer-links" href="/about-us/devolutions-exchanges-policy">Devolutions & Exchanges Policy</a>
      </div>
      <div className="col-md-3">
        <strong className="header">My Account</strong>
        <a className="footer-links" href="/users/:id">My Profile</a>
        <a className="footer-links" href="/users/:id">My Orders</a>
        <a className="footer-links" href="/users/:id">My Cart</a>
      </div>
      <div className="col-md-3">
        <strong className="header">Contact Information</strong>
        <p className="contact-text" href="sss">
          <spam className="material-icons">email </spam>
          - atendimento@progeek.com.br
        </p>
        <p className="contact-text" href="sss">
          <spam className="material-icons">phone </spam>
            - (38) 99145-6183
        </p>
        <p className="contact-text" href="sss">
          <spam className="material-icons">watch_later </spam>
            - Monday to Friday from 8 to 12 and from 13:30 to 18
        </p>
      </div>
      <div className="col-md-3">
        <div id="fb-root"><div className="fb-page" data-href="https://www.facebook.com/ConviteriaDouxPapier/" data-width="250" data-hide-cover="false" data-show-facepile="false" /></div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-2 side-container" />
      <div className="col-md-8 methods-container">
        <h5>Payment & Delivery</h5>
        <img src="./src/components/footer/pagseguro2.png" alt="" height="100" />
        <img src="./src/components/footer/metodos-envio-correios.png" alt="" height="100" />
      </div>
      <div className="col-md-2 side-container" />
    </div>
    <div className="row">
      <div className="col-md-12 botton-footer">
        <strong className="botton-footer-header">Pro Geek Limited. All rights reserved</strong>
      </div>
    </div>
  </div>
);

export default Footer;

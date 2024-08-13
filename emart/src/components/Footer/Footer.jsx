import React from 'react';
import './footer.css';
import { Button } from 'react-bootstrap';

const Footer = () => {


  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="contact-info">
          <h1>Get in Touch</h1>
          <p>
          "Discover the future of shopping with eMart, where convenience meets innovation, 
          offering a seamless shopping experience with unbeatable prices and exceptional customer service."
          </p>
         <div>
            <Button variant="outline-secondary" className="social-login-buttons"><i className="bi-facebook"></i></Button>
            <Button variant="outline-secondary" className="social-login-buttons"><i className="bi bi-google"></i></Button>
            <Button variant="outline-secondary" className='social-login-buttons'><i className="bi bi-linkedin"></i></Button>
          
          </div>
        </div>
        <div className="contact-links">
        <a href='#' class="home">
          <div className="contact-card">
            <p>Home</p>
          </div>
          </a>
          <div className="contact-card">
           
            <p>ContactUS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
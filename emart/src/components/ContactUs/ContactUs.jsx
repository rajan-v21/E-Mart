import React from 'react';
import './contactus.css';
import { Col } from 'react-bootstrap';

const ContactUs = () => {
  return (
    
    <div className="form-container">
        <Col className="illustration-container">
            <img src={`${process.env.PUBLIC_URL}/assets/images/contactus.png`} alt="Illustration" />
        </Col>
        <Col className="contact-form-container">
            <h2>Drop us a line</h2>
            <form className="contact-form">
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="What's your full name?"
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                id="message"
                name="message"
                placeholder="Write your message for the team here"
                rows="4"
                required
                ></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
      </Col>
    </div>
  );
};

export default ContactUs;
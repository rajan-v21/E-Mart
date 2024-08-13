import React from 'react';
import './aboutus.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-left">
        <h1>about Us</h1>
        <h3>"Shop Smart, Live Better."</h3>
      </div>
      <div className="about-right">
        <p>
        Welcome to E-mart, your go-to online shopping destination. We are dedicated to providing our customers with a seamless and enjoyable shopping experience, offering a wide range of high-quality products at competitive prices. Our mission is to bring you the best selection of items, from everyday essentials to unique finds, all in one convenient place. At E-mart, we prioritize customer satisfaction and strive to deliver exceptional service with every purchase. Join us on our journey to redefine online shopping, where savings meet style and convenience. Thank you for choosing e-Mart, where your needs are our top priority.
        </p>
        <button className="read-more-button">READ MORE</button>
      </div>
    </div>
  );
};

export default AboutUs;
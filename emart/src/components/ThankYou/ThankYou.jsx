import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import './thankyou.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const ThankYou = () => {
  const [animationData, setAnimationData] = useState(null);
  const [currentTime] = useState(new Date());

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/orderplaced1.json`)
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(currentTime);

  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <div className="thank-you-text">
          <h1>{currentTime.toLocaleTimeString()}</h1>
          <p className="fine-text">{formattedDate}</p>
          <h2 className='text-thank-you'>Thank you!</h2>
          <p>We are pleased to have received your order. An invoice has been sent to your email!</p>
          <button className="home-button" onClick={() => window.location.href = '/'}>
          <FontAwesomeIcon className="arrow" icon={faAngleLeft} />Continue Shopping</button>
        </div>
        <div className="thank-you-animation">
          {animationData && <Lottie animationData={animationData} loop={true} />}
        </div>
      </div>
      <footer>
        <p>© E-mart Technologies Inc 2024</p>
      </footer>
    </div>
  );
};

export default ThankYou;
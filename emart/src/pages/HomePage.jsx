import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './homepage.css';
import Header from '../components/Header/Header';
import Categories from './Categories/Categories';
import SubCategories from './Categories/SubCategories/SubCategories';
import AboutUs from '../components/AboutUs/AboutUs';
import ContactUs from '../components/ContactUs/ContactUs';
import Footer from '../components/Footer/Footer';


const carouselItems = [
  {
    brand: '/assets/images/brandlogo/apple-logo.png',
    product: 'iPhone 15 Series',
    offer: 'Up to 10% off Voucher',
    link: '/product/1',
    imageSrc: '/assets/images/banner/iphone15-banner.png', // Ensure correct image path
    altText: 'iPhone 15'
  },
  {
    brand: '/assets/images/brandlogo/lg-logo.png',
    product: 'LG UHD 4K TVs',
    offer: 'Up to 15% off Voucher',
    link: '/product/0',
    imageSrc: '/assets/images/banner/tv-banner.png', // Ensure correct image path
    altText: 'LG UHD'
  },
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      <Header />
      <main className="main">
        <Col xs={12}>
          <Carousel controls={false} indicators={true} interval={2000} fade={false}>
            {carouselItems.map((item, index) => (
              <Carousel.Item key={index}>
                <div className="banner">
                <div className="banner-content">
                    <img src={`${process.env.PUBLIC_URL}${item.brand}`} alt="Apple Logo" className="brand-logo" />
                    <h1 className="product">{item.product}</h1>
                    <h2 className="offer">{item.offer}</h2>
                    <Link
                      to={item.link}
                      className="shop-now"
                      onClick={(e) => e.stopPropagation()} // Prevent carousel sliding
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="banner-image">
                    <img
                      className='banner-img'
                      src={`${process.env.PUBLIC_URL}${item.imageSrc}`} // Ensure the image path is correct
                      alt={item.altText}
                    />
                  </div>
              </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </main>
      <div className='categories'>
        {!selectedCategory ? (
          <Categories onSelectCategory={handleCategorySelect} />
        ) : (
          <div>
            <button className="back-to-categories" onClick={handleBackToCategories}>
              <FontAwesomeIcon className="arrow" icon={faAngleLeft} />
              Back to Categories
            </button>
            <SubCategories categoryId={selectedCategory} />
          </div>
        )}
        
      </div> 
      <AboutUs/>
      <ContactUs/>
      <Footer/> 
    </div>
    
  );
};

export default HomePage;
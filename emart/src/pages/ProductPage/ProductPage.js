import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './productpage.css';
import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Rating from '../../components/Rating/Rating';
import Notification from '../../components/Notification/Notification';

function ProductPage() {

  const user = JSON.parse(sessionStorage.getItem('user'));

  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(128);
  const { addToCart } = useCart();
  const [checkboxState, setCheckboxState] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', show: false });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:8080/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError("There was an error fetching the product!", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
  };

  const handleAddToCart = () => {
    if (product) {
      const price = (user && user.usertype > 0) ? 
                      product.isdiscounted === 1 ? 
                        product.price - product.price * 0.1 
                      :
                        checkboxState ?
                          product.price - 100
                        :
                          product.price
                    :
                      product.price;
      const cartProduct = { 
        ...product, 
        price, 
        key: `${product.productId}-${checkboxState}`, // Unique key for the cart item based on checkbox state
        appliedCredits: checkboxState
      };
      addToCart(cartProduct);
      setCheckboxState(false);
      setNotification({ message: 'Product successfully added to cart', show: true });
      setTimeout(() => setNotification({ ...notification, show: false }), 3000); // Hide after 3 seconds
    }
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    setCheckboxState(!checkboxState);
  };

  const storages = [128, 256, 512];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="product-card">
          <p>Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="product-card">
        <div>
          <img
            className='product-image'
            src={`${process.env.PUBLIC_URL}${product.imagepath}`}
            alt={`Product ${product.productname}`}
          />
        </div>
        <div className="product-details">
          <h3 id="product-name">{product.productname}</h3>
          <h2 id="product-description">({product.shortdesc}, {selectedStorage} GB)</h2>
          
          {product.stockQuantity === 0 ? 
            <p className="fine-print text-danger">Out of Stock</p> 
            : <p className="fine-print text-success">In Stock {product.stockQuantity}</p>}

          <p><Rating value={product.rating} /></p>
          
          {user && user.usertype > 0 ? 
            (product.isdiscounted === 0)? (
              <div>
                <p className='price-s'>₹{product.price}</p>
                <div>
                  <Form.Check type="checkbox" name="epoint" style={{ display: 'inline-block', marginRight: '10px' }}
                    checked={checkboxState}
                    onChange={handleCheckboxChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <p className="price">₹{product.price - 100}{' + '}
                  <img className='coin-32px' src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Coin"></img>
                  {'100'}</p>
                </div>
              </div>
            ):(
              <div className='offer-product'>
                <h5 className="price-s"><s>₹{product.price}</s></h5>
                <h4 className="discounted-price">₹{product.price - product.price*0.1}</h4>
              </div>
              )
          : (
            <p className="price">₹{product.price}</p>
          )}

          <p>{product.longdesc}</p>
          <h3>Storage</h3>
          <div className="storage-options">
            {storages.map((storage) => (
              <button
                key={storage}
                onClick={() => handleStorageChange(storage)}
                className={storage === selectedStorage ? 'active' : ''}>
                {storage} GB
              </button>
            ))}
          </div>
          <br />
          <button className="add-to-cart" 
            onClick={handleAddToCart}
            disabled={product.stockquantity <= 0}>Add to cart</button>
          <button className="buy-now">Buy Now</button>
          <br />
          <div className="delivery">
            <label>Enter Delivery Pincode</label><br />
            <input type="text" placeholder="Enter pincode" />
            <button className="check">Check</button>
          </div>
          <p className="fine-print">Delivery may take up to 6-7 days depending on the pincode</p>
        </div>
      </div>
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
}

export default ProductPage;

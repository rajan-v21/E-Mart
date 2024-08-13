import React, {useState} from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import EmptyCart from '../../components/EmptyCart/EmptyCart';
import Header from '../../components/Header/Header';
import Notification from '../../components/Notification/Notification';
import './shoppingcart.css'; // CSS for styling

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, incrementItem, decrementItem, removeFromCart } = useCart();
  const [notification, setNotification] = useState({ message: '', show: false });

  // const { user } = useAuth(); // Access user data from context

  const _isLoggedin = true;
  const _userType = 1; 
  const _userCredits = 100; 
  let _totalCredits = 0;

  const handleContinueShopping = () => {
    navigate('/', { replace: true });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const onCheckOut = () => {
    if(!_isLoggedin) {
      setNotification({ message: 'Please login', show: true });
    }
    else if(cartItems.length === 0) {
      setNotification({ message: 'Cart is empty', show: true });
      return;
    }
    else if(_userCredits < _totalCredits) {
      setNotification({ message: 'Insufficient credits', show: true });
      return;
    }
    else{
      _totalCredits = 0;
      setNotification({ message: 'Redirecting to checkout', show: true });
      navigate('/thankyou', { replace: true });
    }
  };

  return (
    <div>
      <Header />
      {cartItems.length === 0 ? <EmptyCart /> : (
        <Container className="row-shopping-cart">
          <Row>
            <div>
              <h2>Your Cart</h2>
              <p>{cartItems.length} items in your cart</p>
            </div>
            <Col>
              {cartItems.map((item) => (
                <Card key={item.key} className="card-shopping-cart">
                  <Card.Body>
                    <Row>
                      <Col md={3}>
                        <Card.Img className='card-cart-img' src={item.imagepath} alt={item.name} />
                      </Col>
                      <Col>
                        <h5>{item.name}</h5>
                        <p>
                          <strong>Each: </strong>₹{item.price.toFixed(2)}
                          {item.appliedCredits && _isLoggedin && _userType === 1 ? (
                            <>
                              {' + '}
                              <img className='coin-32px' src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Coin" />
                              {'100'}
                            </>
                          ) : null}
                        </p>
                        <Form.Group as={Row} controlId={`quantity-${item.key}`} className="quantity-control">
                          <Form.Label column sm="2">Quantity:</Form.Label>
                          <div className='quantity-div'>
                            <button type="button" className="quantity-button" onClick={() => decrementItem(item.key)}>
                              -
                            </button>
                            <Form.Control type="number" value={item.quantity} readOnly className="quantity-input" />
                            <button type="button" className="quantity-button" onClick={() => incrementItem(item.key)}>
                              +
                            </button>
                          </div>
                        </Form.Group>
                        <p>
                          <strong>Total: </strong>₹{(item.price * item.quantity).toFixed(2)}
                          {item.appliedCredits && _isLoggedin && _userType === 1 ? (
                            <>
                              {' + '}
                              <img className='coin-32px' src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Coin" />
                              {_totalCredits = 100 * item.quantity}
                              {_totalCredits > _userCredits && (
                                <span className='text-danger'>
                                  {` (Not enough credits by ${_totalCredits - _userCredits})`}
                                </span>
                              )}
                            </>
                          ) : null}
                        </p>
                        <Button className="custom-delete-button" onClick={() => removeFromCart(item.key)}>
                          <FontAwesomeIcon icon={faTrash} /> Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              <Button variant="link" onClick={handleContinueShopping} className="continue-shopping">
                Continue Shopping
              </Button>
            </Col>
            <Col md={4}>
              <div className="cart-promotion">
                <h4>Promotions</h4>
                <ListGroup variant="flush" className='cart-summary'>
                  <ListGroup.Item>Free Shipping on Orders Above ₹100</ListGroup.Item>
                  <ListGroup.Item>Subtotal <span className="float-end">₹{calculateTotal()}</span></ListGroup.Item>
                  <ListGroup.Item>Shipping cost <span className="float-end">₹18.97</span></ListGroup.Item>
                  <ListGroup.Item>Shipping Discount <span className="text-danger float-end">-₹18.97</span></ListGroup.Item>
                  <ListGroup.Item>Estimated Sales Tax <span className="float-end">TBD</span></ListGroup.Item>
                  <ListGroup.Item><strong>Estimated Total</strong> <span className="float-end"><strong>₹{calculateTotal()}</strong></span></ListGroup.Item>
                </ListGroup>
                <Button className="w-100 mt-3 checkout-button" onClick={() => onCheckOut()}>
                  CHECKOUT
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
};

export default ShoppingCart;

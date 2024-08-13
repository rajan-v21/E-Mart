import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import './header.css';
import SearchBar from './SearchBar/SearchBar';
import { UserContext } from '../../context/UserContext';

const Header = () => {
  const { loggedIn, userName, userType, userEpoint } = useContext(UserContext);
  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar className='emart-header'>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/images/emart.png`} alt="Emart Logo" className='emart-logo' />
        </Link>
        {loggedIn && userType > 0 && (
          <>
            <img src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Credits" className='coin' />
            <input type='text' disabled value={userEpoint} className='coin-value' />
          </>
        )}
        <Typography variant='h4' className='emart-typography'></Typography>
        <div style={{ color: 'black', marginRight: '20px'}}>
          Welcome, {loggedIn ? userName : 'Guest'}
        </div>
        <SearchBar />
        {loggedIn ? (
          <Link onClick={handleLogout} className='linkto-textbutton'>
            Logout
          </Link>
        ) : (
          <Link to="/signup" className='linkto-textbutton'>
            Sign Up
          </Link>
        )}
        {loggedIn &&(
          <Link to="/profile">
            <IconButton className='linkto-iconbutton'>
              <ProfileIcon />
            </IconButton>
          </Link>
        )}
        <Link to="/shoppingcart">
          <IconButton className='linkto-iconbutton'>
            <ShoppingCartIcon />
          </IconButton>
        </Link>
        <Link to="/favorite">
          <IconButton className='linkto-iconbutton'>
            <FavoriteIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

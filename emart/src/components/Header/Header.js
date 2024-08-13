import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../context/AuthContext';
import './header.css';
import SearchBar from './SearchBar/SearchBar';

const Header = () => {
  const { user } = useAuth(); // Access user data from context

  console.log('User Object:', user);
  if (user) {
    console.log('Usertype:', user.usertype);
    console.log('User ID:', user.userid);
    console.log('Epoints:', user.epoint);
    console.log('Username:', user.username);
    console.log('User Email:', user.useremail);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar className='emart-header'>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/images/emart.png`} alt="Emart Logo" className='emart-logo' />
        </Link>
        {user && user.epoint > 0 && (
          <>
            <img src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Credits" className='coin' />
            <input type='text' disabled value={user.epoint} className='coin-value' />
          </>
        )}
        <Typography variant='h4' className='emart-typography'></Typography>
        <div style={{ color: 'black', marginRight: '20px'}}>
          Welcome, {user ? user.username : 'Guest'}
        </div>
        <SearchBar />
        {user ? (
          <Link onClick={handleLogout} className='linkto-textbutton'>
            Logout
          </Link>
        ) : (
          <Link to="/signup" className='linkto-textbutton'>
            Sign Up
          </Link>
        )}
        <Link to="/profile">
          <IconButton className='linkto-iconbutton'>
            <ProfileIcon />
          </IconButton>
        </Link>
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

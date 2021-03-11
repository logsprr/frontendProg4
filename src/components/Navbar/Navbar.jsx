import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/commerce.png';
import useStyles from './styles';
import ProductsService from '../../services/Products';
import { loadAllProducts, loadFailedProducts } from '../../store/actions/Products';
import { MenuOptions } from '..';

const PrimarySearchAppBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { productsState, user } = useSelector((state) => ({
    productsState: state.products,
    user: state.user,
  }));

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const onDeleteSearch = async () => {
    const { data, status } = await new ProductsService().getAll();
    if (status === 200) {
      dispatch(loadAllProducts(data));
    } else {
      dispatch(loadFailedProducts());
    }
  };
  const onRequestFetch = async (filter) => {
    setLoading(true);
    if (filter === '') {
      onDeleteSearch();
      setLoading(false);
    } else {
      const { data, status } = await new ProductsService().getAll();
      const newArray = await data.filter((item) => item.name.includes(filter));
      if (status === 200) {
        dispatch(loadAllProducts(newArray));
      } else {
        dispatch(loadFailedProducts());
      }
      setLoading(false);
    }
  };
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit" style={{ backgroundColor: '#2f3640' }}>
        <Toolbar style={{ flexWrap: 'wrap' }}>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit" style={{ color: 'white' }}>
            UaiMazon
          </Typography>
          <div style={{ padding: 10, flexDirection: 'row', display: 'flex' }}>
            {location.pathname !== '/login' && (
            <SearchBar
              style={{ width: 250 }}
              onRequestSearch={() => onRequestFetch()}
              placeholder="Buscar produtos..."
              autoFocus
              onChange={(filter) => onRequestFetch(filter)}
              onCancelSearch={() => onDeleteSearch()}
            />
            )}
            {location.pathname === '/' && (
            <div className={classes.button}>
              <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart style={{ color: 'white' }} />
                </Badge>
              </IconButton>
            </div>
            )}
            {location.pathname !== '/login' && (
            <div className={classes.button}>
              <MenuOptions />
            </div>
            )}
          </div>
        </Toolbar>
        {loading && <LinearProgress />}
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;

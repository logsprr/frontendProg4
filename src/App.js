import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Products, Cart, NewProduct, Login, Create, Sells } from './components';
import ProductsService from './services/Products';
import { addProduct, loadAllProducts, loadFailedProducts } from './store/actions/Products';

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [value, setValue] = useState(null);

  const dispatch = useDispatch();
  const { productsState, userState, sellsState, state } = useSelector((state) => ({
    productsState: state.products,
    userState: state.user,
    sellsState: state.sells,
  }));

  const fetchProducts = async () => {
    const { data, status } = await new ProductsService().getAll();
    if (status === 200) {
      dispatch(loadAllProducts(data));
    } else {
      dispatch(loadFailedProducts());
    }
  };

  const handleAddToCart = async (product, quantity) => {
    for (const key in productsState.dataCart) {
      if (productsState.dataCart[key].id == product.id) {
        alert('Produto já adicionado');
        return;
      }
    }
    const newProduct = {
      id: product.id,
      name: product.name,
      vUnCom: product.vUnCom,
      description: product.description,
      picture: product.picture,
      qtd: 1,
      priceTotal: product.vUnCom,
      seller: { id: product.seller.id }
    };
    dispatch(addProduct(newProduct));
  };

  useEffect(() => {
    fetchProducts();
  }, [value]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar totalItems={productsState.dataCart.length} handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/my-sells">
            <Sells products={sellsState.dataSells} />
          </Route>
          <Route exact path="/">
            <Products products={productsState.dataProducts} onAddToCart={handleAddToCart} handleUpdateCartQty />
          </Route>
          <Route exact path="/cart">
            <Cart cart={productsState.dataCart} totalPrice={productsState.totalPrice} />
          </Route>
          <Route path="/new-product" exact>
            <NewProduct onPost={setValue} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

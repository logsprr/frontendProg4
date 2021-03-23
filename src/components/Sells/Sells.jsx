import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { useDispatch, useSelector } from 'react-redux';
import Product from './Product/Product';
import useStyles from './styles';

import SellerService from '../../services/SellerService';
import { loadAllSells, loadFailedSells } from '../../store/actions/Sell';

const Sells = ({ onAddToCart }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { userState, sellsState } = useSelector((state) => ({
    userState: state.user,
    sellsState: state.sells.dataSells,
  }));

  const fetchSells = async () => {
    const { data, status } = await new SellerService().getAll(userState.data.id);
    if (status === 200) {
      dispatch(loadAllSells(data));
    } else {
      dispatch(loadFailedSells());
    }
  };

  useEffect(() => {
    fetchSells();
  }, []);

  if (!sellsState.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {sellsState.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Sells;


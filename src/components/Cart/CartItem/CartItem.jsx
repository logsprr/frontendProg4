import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, deleteProduct } from '../../../store/actions/Products';
import useStyles from './styles';

const CartItem = ({ item, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productsState } = useSelector(state => ({
    productsState: state.products,
  }));
  const updtProduct = (type) => {
    const qtd = type == 'm' ? productsState.dataCart[index].qtd + 1 : productsState.dataCart[index].qtd - 1; 
    productsState.dataCart[index].qtd = qtd;
    productsState.dataCart[index].priceTotal =  parseFloat(Number(productsState.dataCart[index].vUnCom  * qtd).toFixed(2)) ;
    dispatch(updateProduct(productsState.dataCart))
}
const removeProduct = () => {
    productsState.dataCart.splice(index, 1);
    dispatch(deleteProduct(productsState.dataCart));
}

  return (
    <Card className="cart-item">
      <CardMedia className={classes.media} image={item.picture ? item.picture  : 'http://anest-iwata.com.br/wp-content/uploads/2016/10/Sem-imagem.png'} title={item.name} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">R$ {item.priceTotal}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button disabled={item.qtd == 1} type="button" size="small"  onClick={() => updtProduct('n')}  >-</Button>
          <Typography>&nbsp;{item.qtd}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => updtProduct('m')} >+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={() => removeProduct()} >Remover</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;

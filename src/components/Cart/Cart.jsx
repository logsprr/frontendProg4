import React, { useState } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem/CartItem';
import useStyles from './styles';
import { ListTypesRequest } from '../../config/types';
import { DialogBox } from '../index';
import SellerService from '../../services/SellerService';

const Cart = ({ cart, totalPrice }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const { userState } = useSelector((state) => ({
    userState: state.user,
  }));
  const removeProducts = () => {
    dispatch({ type: ListTypesRequest.LOAD_CLEAN });
  };

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">Você não adicionou nenhum item
      <Link className={classes.link} to="/"> Adicione produtos</Link>
    </Typography>
  );

  const purchaseProducts = async () => {
    if (userState) {
      const data = {
        sellProducts: [
          {
            id: '6003ac0eccfecf0f6a6205fd',
            name: 'teste 2',
            vUnCom: 2.59,
            qCom: 3,
            vProd: 6.77,
          },
        ],
        seller: {
          id: '6002e834b4360726fdbba754',
        },
        customer: {
          id: '6003aff3ccfecf0f6a620607',
        },
        number: 1,
        vTotal: 6.77,
      };
      const response = await new SellerService().save(data);
      console.log(response);
    } else {
      history.push('/login');
    }
  };
  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.map((lineItem, index) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} index={index} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: R$ {totalPrice}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >Finalizar compra
          </Button>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => removeProducts()}
          >Limpar Carrinho
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Seu Carrinho de Compras</Typography>
      { cart.length === 0 ? renderEmptyCart() : renderCart()}
      <DialogBox
        open={open}
        setOpen={setOpen}
        title="Finalizar Compras"
        message="Dsejar comprar os itens e finalizar sua compra?"
        acceptTitle="Sim"
        exitTitle="Não"
        onPress={purchaseProducts}
      />
    </Container>
  );
};

export default Cart;

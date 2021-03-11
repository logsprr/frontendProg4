import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
        {product.sellProducts.map((item) => (
          <CardMedia
            className={classes.media}
            image={item.picture ? item.picture : 'http://anest-iwata.com.br/wp-content/uploads/2016/10/Sem-imagem.png'}
            title={item.name}
          />
        ))}
      </div>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.customer.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            R${product.vTotal}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Product;


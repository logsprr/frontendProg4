import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  const handleAddToCart = () => onAddToCart(product, 1);


  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.picture ? product.picture  : 'http://anest-iwata.com.br/wp-content/uploads/2016/10/Sem-imagem.png'} title={product.name} />
      <CardContent> 
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            R${product.vUnCom}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
        <Typography dangerouslySetInnerHTML={{ __html: product.seller.name }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;


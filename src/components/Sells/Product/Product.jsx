import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';

import useStyles from './styles';

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
        {product.sellProducts.map((item, index) => (
          <div>{index < 3 && (
          <CardMedia
            className={classes.media}
            image={item.picture ? item.picture : 'http://anest-iwata.com.br/wp-content/uploads/2016/10/Sem-imagem.png'}
            title={item.name}
          />
          )}
          </div>
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


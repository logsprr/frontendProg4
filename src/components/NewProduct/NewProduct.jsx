import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { DropzoneArea } from 'material-ui-dropzone';
import firebase from 'firebase';
import AddressForm from './AddressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
import useStyles from './styles';
import ProductsService from '../../services/Products';

const steps = ['Dados', 'Imagem'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [productId, setProductId] = useState('');
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const history = useHistory();

  const nextStep = (id) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setProductId(id);
  };
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const handleChange = (files) => {
    if (files.length > 0) {
      const file = files[0];
      const storageRef = firebase.storage().ref(`img/${file.name}`);
      const task = storageRef.put(file);
      task.then(() => {
        task.snapshot.ref.getDownloadURL().then(async (url) => {
          const response = await new ProductsService().updatePicture(url, productId);
          history.push("/");
        });
      });
    }
  };
  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

  const Drop = () => (
    <DropzoneArea
      onChange={handleChange}
      acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
      filesLimit={1}
      dropzoneText="Arraste ou selecione um arquivo"
    />
  );
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Cadastrar Novo Produto</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 ? <Form /> : <Drop /> }
        </Paper>
      </main>
    </>
  );
};

export default Checkout;

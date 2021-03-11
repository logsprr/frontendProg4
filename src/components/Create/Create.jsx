import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, Grid } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from './styles';
import FormInput from '../NewProduct/CustomTextField/CustomTextField';
import UserService from '../../services/UserService';
import { loadUser } from '../../store/actions/User';

const steps = ['Dados', 'Imagem'];

const Create = ({ }) => {
  const [loading, setLoading] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const history = useHistory();
  const methods = useForm();
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  const create = async (data) => {
    setLoading(true);
    if (data.password === data.repeat_password) {
      try {
        const response = await new UserService().save(data);
        console.log(response);
        setLoading(false);
        loadUser(response.data);
        history.push('/products');
      } catch (err) {
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert('Senhas não conferem');
    }
  };
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Crie sua conta</Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => create(data))}>
              <Grid container spacing={3}>
                <FormInput width={0} required name="name" label="Nome" />
                <wbr />
                <FormInput width={0} required name="email" label="E-mail" />
                <wbr />
                <FormInput type="password" width={0} required name="password" label="Senha" />
                <wbr />
                <FormInput type="password" width={0} required name="repeat_password" label="Repita sua Senha" />
              </Grid>
              <br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="text" color="primary">Criar Conta</Button>
              </div>
            </form>
          </FormProvider>
          {loading && <LinearProgress style={{ marginTop: 10 }} />}
        </Paper>

      </main>
    </>
  );
};

export default Create;

import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, Grid } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from './styles';
import FormInput from '../NewProduct/CustomTextField/CustomTextField';
import UserService from '../../services/UserService';
import { loadFailedUser, loadUser } from '../../store/actions/User';

const steps = ['Dados', 'Imagem'];

const Login = ({ }) => {
  const [loading, setLoading] = useState(false);
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

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await new UserService().login(data);
      setLoading(false);
      if (response.status === 200) {
        loadUser(response.data);
        history.push('/');
      }
    } catch (error) {
      setLoading(false);
      alert('Senha ou email informados invalidos');
    }
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Login</Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => login(data))}>
              <Grid container spacing={3}>
                <FormInput width={0} required name="email" label="E-mail" />
                <wbr />
                <FormInput type="password" width={0} required name="password" label="Senha" />
              </Grid>
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained" color="primary">LogIn</Button>
                <Button onClick={() => history.push('/create')} variant="text" color="primary">Criar Conta</Button>
              </div>
            </form>
          </FormProvider>
          {loading && <LinearProgress style={{ marginTop: 10 }} />}
        </Paper>

      </main>
    </>
  );
};

export default Login;

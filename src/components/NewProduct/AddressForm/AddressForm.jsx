import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import FormInput from '../CustomTextField/CustomTextField';
import ProductsService from '../../../services/Products';

const AddressForm = ({ nextStep }) => {
  const methods = useForm();

  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const addNewProduct = async (data) => {
    data = { ...data, seller: { id: user.data.id } };
    const response = await new ProductsService().save(data);
    if (response.status === 200) {
      nextStep(response.data.id);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>Dados do Produto</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => addNewProduct(data))}>
          <Grid container spacing={3}>
            <FormInput required name="name" label="Nome" />
            <FormInput required name="vUnCom" label="Valor" />
            <FormInput width={0} name="description" label="Descrição" />
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">Próximo</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;

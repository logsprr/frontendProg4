import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required, width, type = 'text' }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={width === 0 ? 12 : 6}>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
        type={type}
      />
    </Grid>
  );
}

export default FormInput;

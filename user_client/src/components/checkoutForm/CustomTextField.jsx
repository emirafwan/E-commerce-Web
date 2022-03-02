import React from 'react'
import { Grid, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form'

const FormInput = ({ name, label}) => {
    const { control } = useFormContext()
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                fullWidth
                name={name}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id=""
                        label={label}
                    />
                )}
            />
        </Grid>
    )
}

export default FormInput

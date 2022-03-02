import { Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import CustomTextField from './CustomTextField'
import { Link } from 'react-router-dom'

const AddressForm = ({ next }) => {
    const methods = useForm()

    const ButtonStyle = styled.div`
    display: flex;
    justify-content: space-between;
    `

    return (
        <div>
            <br />
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data}))}>
                    <Grid container spacing={3}>
                        <CustomTextField name='Fullname' label='Fullname'/>
                        <CustomTextField name='Email' label='Email'/>
                        <CustomTextField name='City' label='City'/>
                        <CustomTextField name='Post' label='Postal Code'/>
                        <CustomTextField name='Address' label='Address'/>
                    </Grid>
                    <br/>
                    <ButtonStyle>
                        <Button component={Link} to="/Cart" variant="outlined">Back To Cart</Button>
                        <Button type="submit" variant="contained" color="primary" >Next</Button>
                    </ButtonStyle>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm

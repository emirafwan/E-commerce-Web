import React from 'react'
import styled from 'styled-components'
import { Grid } from '@mui/material';
import Product from './Product'

const Container = styled.div`
    flex-grow: 1;
    padding-top: 7%;
    padding-right: 2%;
    padding-left: 2%;
`
const Products = ({ products, onAddToCart }) => {
    return (
        <Container >
            <Grid container justifyContent='center' spacing={4}>
                {products.map((product) => (
                    <Grid item key = {product._id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Products

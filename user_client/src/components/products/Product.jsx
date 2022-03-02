import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'


const Container = styled(Card)`
    max-width: 100%;    
`
const Media = styled(CardMedia)`
    height: 62px;
    padding-top: 86.25%;
`
const CardAct = styled(CardActions)`
    display: flex;
    justify-content: flex-end;
`
const CardCont = styled(CardContent)`
    display: flex;
    justify-content: space-between;
`

const Product = ({product, onAddToCart}) => {
    return (
        <Container>
            <Media image={product.image} title={product.name} />
            <CardContent>
                <CardCont>
                    <Typography variant="h5">
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        ${product.price}
                    </Typography>
                </CardCont>
                <Typography variant="body2" color="textSecondary">{product.description}</Typography>
            </CardContent>
            <CardAct disableSpacing>
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product._id, 1)}>
                    <AddShoppingCart/>
                </IconButton>
            </CardAct>
        </Container>
    )
}

export default Product

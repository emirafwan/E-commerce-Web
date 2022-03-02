import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'
import styled from 'styled-components'


const Container = styled(Card)`

`

const Media = styled(CardMedia)`
    height: 225px;
`
const Content = styled(CardContent)`
    display: flex;
    justify-content: space-between;
`
const CardAct = styled(CardActions)`
    justify-content: space-between;
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
` 

const CartItem = ({ item, onUpdateCartQty, onRemoveCart }) => {
    return (
        <Container>
            <Media image={item.image} alt={item.name} />
            <Content>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h4">${item.price}</Typography>
            </Content>
            <CardAct>
                <Buttons>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item._id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item._id, item.quantity + 1)}>+</Button>
                </Buttons>
                <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveCart(item._id)}>Remove</Button>
            </CardAct>
        </Container>
    )
}
export default CartItem

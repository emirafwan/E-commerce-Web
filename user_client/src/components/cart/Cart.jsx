import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import CartItem from "./CartItem"
import { Link } from 'react-router-dom'


// const carts = [
//     {id:1, name:'Magic-Mouse', description:'magic mouse with 1ms response time.', price:'$50', image:'https://macstore.id/konten/uploads/2018/08/MRME2_AV1-1.jpg'},
//     {id:2, name:'Bi-Headphone', description:'comfort way to hear music', price:'$15', image: 'https://i5.walmartimages.com/asr/4fe97836-61ac-43f4-9435-549ea693e793_1.b71a34c39acf22b59157d031ffac43e2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},
// ]

const Containers = styled(Container)`
    margin-top: 6%;
    margin-bottom: 6%;
`
const Toolbar =styled.div`
`
const Title = styled(Typography)`
    margin-top: 5%;
`

const FIlledContainer = styled.div`
`
const CartGrid = styled(Grid)`
`
const CartDetails = styled.div`
    display: flex;
    margin-top: 6%;
    width: 100%;
    justify-content: space-between;   
`
const EmptyButton = styled(Button)`
    min-width: 150px;
    margin-bottom: 5px;
    margin-right: 20px;
`
const CheckoutButton = styled(Button)`
    min-width: 150px;
`

const Cart = ({ cart, totalPrice, handleUpdateQty, handleURemoveCart, handleEmptyCart }) => {

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no item in your cart, <Link to="/"> start adding some</Link>
        </Typography>
    )
    
    const FilledCart = () => (
        <FIlledContainer>
            <CartGrid container spacing={3}>
                {cart.map((item) => (
                    <Grid item key={item._id} xs={12} sm={3}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateQty} onRemoveCart={handleURemoveCart}/>
                    </Grid>
                ))}
            </CartGrid>
            <CartDetails>
                <Typography variant="h4">
                    subtotal: ${totalPrice}
                </Typography>
                <div>
                    <EmptyButton size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart} >Empty Cart</EmptyButton>
                    <CheckoutButton component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</CheckoutButton>
                </div>
            </CartDetails>
        </FIlledContainer>
    )

    if(!cart) return 'Loading';

    return (
        <Containers>
            <Toolbar/>
            <Title variant="h3" gutterBottom>
                Your Shopping Cart
            </Title>
            { !cart.length ? <EmptyCart/> : <FilledCart/>}
        </Containers>
    )
}

export default Cart

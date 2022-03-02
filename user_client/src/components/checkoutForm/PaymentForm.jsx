import React from 'react';
import { Button, Divider, Typography } from '@mui/material';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ addressData, cart, totalPrice, sendAddress, backStep, refreshCart }) => {
  const handleSubmit = async ( event, elements, stripe) => {
    event.preventDefault();

    if(!stripe || !elements) return;

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({ type:'card', card: cardElement})

    // if(error) {
    //   console.log(error);
    // } else {
    //   const orderData = {
    //     cart_items: cart,
    //     address: {Fullname: 'Primary', Email:addressData.Email, City:addressData.City, PostCode:addressData.Post, Address:addressData.Address},
    //     Payment: {
    //       gateway: 'stripe',
    //       stripe: {
    //         payment_method_id: paymentMethod.id

    //       }
    //     }
    //   }
    //   console.log("berhasil")
    // }

    sendAddress();
    refreshCart()
  } 


  return (
    <>
      <br />
      <Review cart={cart} totalPrice={totalPrice}/>
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                  Pay  ${totalPrice}
                </Button>
              </div>
            </form>
        )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
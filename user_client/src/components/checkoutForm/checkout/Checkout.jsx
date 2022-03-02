import { Button, Container, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { Link } from 'react-router-dom'

const steps = ['Shipping address', 'Payment details']

const PaperStyle = styled(Paper)`
    margin-top: 25%;
    padding: 20px;
`

const Checkout = ({ cart, totalPrice, refreshCart}) => {
    const [activeStep, setActiveStep] = useState(0)
    const [addressData, setAddressData] = useState({});
    const nextStep = () => setActiveStep((preActiveStep) => preActiveStep + 1)
    const backStep = () => setActiveStep((preActiveStep) => preActiveStep - 1)


    const sendSales = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id:(cart[0]._id), name:(cart[0].name), description:(cart[0].description), price:(cart[0].price)}), 
        }
    
        const response = await fetch("http://localhost:8000/api/sales/add", requestOptions)
        const resp = await response.json()
        
        if (!response.ok) {
            console.log(resp.detail);
        } else {
            console.log(resp)
        }
        
    }

    const sendAddress = async () => {
        console.log(addressData)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Fullname:(addressData.Fullname), Email:(addressData.Email), City:(addressData.City), Post:(addressData.Post), Address:(addressData.Address) }), 
        }
    
        const response = await fetch("http://localhost:8000/api/address/add", requestOptions)
        const resp = await response.json()
        
        if (!response.ok) {
            console.log(resp.detail);
        } else {
            console.log(resp)
        }
        
        nextStep()
        sendSales()
    }

    const next = async (data) => {
        setAddressData(data)
        nextStep()
    }
    const Confirmation = () => (
        <>
        
            <div style={{ margin: '50px 0 8px 0' }}>
                <Typography>
                    Transaction Completed, Thanks for your Order
                </Typography>
                <Divider />
            </div>
            <br />
            <Button component={Link} to='/' variant="outlined" type="button" >Back to Home</Button>
        </>
    )


    const Form = () => (activeStep === 0
    ? <AddressForm next={next} setAddressData={setAddressData} />
    : <PaymentForm cart={cart} totalPrice={totalPrice} sendAddress={sendAddress} addressData={addressData} backStep={backStep} refreshCart={refreshCart} />);
    
    return (
        <Container maxWidth="sm">
            <PaperStyle elevation={5}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : <Form />}
            </PaperStyle>
        </Container>

    )
}

export default Checkout

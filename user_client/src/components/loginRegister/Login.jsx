import { Person } from '@mui/icons-material'
import { Button, Divider, Grid, TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Login = () => {

    const Container = styled.div`
        width: 30%;
        margin: 100px auto;
        padding: 25px;
        justify-content: center;
        box-shadow: 0 6px 20px rgba(0,0,0,0.19);
        display: flex;
        flex-direction: column;
    `
    const Icon = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
    `
    const Text = styled.div`
        color:#027068;
        font-weight: bold;
        font-size: 40px;
    `
    const ButtonPos = styled(Button)`
        padding-left: 10px;
    `

    return (
        <Container>
            <Icon>
                <div className='icon-class'></div>
                    <Person fontSize='large' />
                <Text>Login</Text>
            </Icon>

            <Grid container direction={"column"} rowSpacing={1} >
                <Grid item>
                    <TextField id="email" className="p-2" type="text" variant="outlined" label="Enter email" fullWidth />
                </Grid>
                <Grid item>
                    <TextField id="password" className="p-2" type="text" variant="outlined" label="Enter Password" fullWidth />
                </Grid>
                <br/>
                <ButtonPos component={Link} to="/" variant="contained" color="primary" >Login</ButtonPos>
                
            </Grid>
            <br/>
            <Divider variant="middle">
                <p className='text-center'>
                    <Link to="/register" className="text-black-50" >
                         <h5>Create Account</h5>
                    </Link>
                </p>
            </Divider>
        </Container>
    )
}

export default Login

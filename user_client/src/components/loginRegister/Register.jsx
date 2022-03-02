import { CheckBox, CheckBoxOutlineBlank, PersonAdd } from '@mui/icons-material'
import { Button, Checkbox, Divider, FormControlLabel, Grid, TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const Register = () => {
    return (
        <Container>
            <Icon>
                <div className='icon-class'></div>
                    <PersonAdd></PersonAdd>
                <Text>Register</Text>
            </Icon>

            <Grid container direction={"column"} rowSpacing={1}>
                <Grid item>
                    <TextField id="firstname" type="text" variant="outlined" label="Enter First Name" fullWidth />
                </Grid>
                <Grid item>
                    <TextField id="lastname" type="text" variant="outlined" label="Enter Last Name" fullWidth />
                </Grid>
                <Grid item>
                    <TextField id="email" className="p-2" type="text" variant="outlined" label="Enter E-mail" fullWidth />
                </Grid>
                <Grid item>
                    <TextField id="password" className="p-2" type="text" variant="outlined" label="Enter Password" fullWidth />
                </Grid>

                <Grid item>               
                    <FormControlLabel
                        control={
                            <Checkbox
                            icon={<CheckBoxOutlineBlank fontSize='small' />}
                            checkedIcon={<CheckBox fontSize='small' />}
                            name="checked"
                            />
                        }
                        
                        label="i agree to all conditions"
                        />
                </Grid>
                <br/>
                <ButtonPos component={Link} to="/login" variant="contained" color="primary" >Create Account</ButtonPos>
            </Grid>
            <br/>
            <Divider variant="middle">
                <p className='text-center'>
                    <Link to="/login" className="text-black-50" >
                         <h5>Already have an account?</h5>
                    </Link>
                </p>
            </Divider>
        </Container>
    )
}

export default Register

    
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/logo.jpeg'

const Container = styled(AppBar)` 
    box-shadow: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12); 
`

const Title = styled(Typography)`
    flex-grow: 1;
    cursor: pointer;
    text-decoration: none;
`
const Logo = styled.img`
    margin-right: 10px;
    margin-bottom: 6px;
    height: 30px;
`

const MenuItem = styled.span`
    cursor: pointer;
    margin-left: 25px;
`

const Navbar = ({ totalItems }) => {
    const location = useLocation()
    
    return (
        <Container position="fixed" color="inherit">
            <Toolbar>
                <Logo src={logo} alt="Usaha Bersama"/>
                <Title component= {Link} to="/" variant="h5" color="inherit" >
                    Usaha Bersama
                </Title>
                <MenuItem>
                {location.pathname === '/' && (
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>)}
                </MenuItem>
                <MenuItem>
                    <Typography variant="h6">Logout</Typography>
                </MenuItem>
            </Toolbar>
        </Container>
        
    );
}

export default Navbar

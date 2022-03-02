import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

// const products = [
//   {id:1, name:'Minyak goreng',quantity:1},
//   {id:1, name:'Kecap',quantity:2},
//  ]


const Review = ({cart, totalPrice}) => (
  <>
    <Typography variant="h6" gutterBottom>Order summary</Typography>
    <List disablePadding>
      {cart.map((product) => (
        <ListItem style={{ padding: '10px 0' }} key={product.name}>
          <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
          <Typography variant="body2">${product.price*product.quantity}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          ${totalPrice}
        </Typography>
      </ListItem>
    </List>
  </>
);

export default Review;

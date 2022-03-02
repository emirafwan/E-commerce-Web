import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from "./context/UserContext"


ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
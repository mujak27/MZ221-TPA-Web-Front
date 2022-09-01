import './style.sass';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import { Activation } from './components/Auth/Activation/Activation';
import { Forget } from './components/Auth/Forget/Forget';
import { Login } from './components/Auth/Login/Login';
import { Register } from './components/Auth/register/Register';
import { Reset } from './components/Auth/Reset/Reset';
import { ApolloClientProvider } from './Provider/ApolloClientProvider';
import { ThemeProvider } from './Provider/ThemeProvider';
import { UserProvider } from './Provider/UserProvider';

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    // all : inherit
    text-decoration: none
  }
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider>
      <>
      <Router>
      <ApolloClientProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activation/:activationId" element={<Activation />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset/:resetId" element={<Reset />} />
          <Route path="*" element={<>
            <ApolloClientProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </ApolloClientProvider>
          </>} />
        </Routes>
      </ApolloClientProvider>
      </Router>
      </>
      <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>
)

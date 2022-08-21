import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClientProvider } from './Provider/ApolloClientProvider'
import { Login } from './components/Login/Login';
import { Register } from './components/register/Register';
import { Activation } from './components/Activation/Activation';
import { ContextProvider } from './Provider/ContextProvider';
import { Home } from './components/Home/Home';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloClientProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activation/:activationId" element={<Activation />} />
        <Route path="*" element={<>
          <ContextProvider>
            <App />
          </ContextProvider>
        </>} />
      </Routes>
    </Router>
    </ApolloClientProvider>
  </React.StrictMode>
)

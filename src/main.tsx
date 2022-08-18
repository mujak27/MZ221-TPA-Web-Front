import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClientProvider } from './Provider/ApolloClientProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloClientProvider>
      <App />
    </ApolloClientProvider>
  </React.StrictMode>
)

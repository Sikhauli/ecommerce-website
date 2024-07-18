import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SnackbarProvider } from 'notistack';
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from 'react-redux';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <NextUIProvider>
        <React.StrictMode>
          <main className="light text-foreground bg-background">
            <App />
          </main>
        </React.StrictMode>
      </NextUIProvider>
    </Provider>
  </SnackbarProvider>
)

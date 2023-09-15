import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from "store/appSlice.js";


const store = configureStore({
  reducer: {
    app: appReducer,
  }
})


const AppWrapper = () => {

  const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
 
      </QueryClientProvider>
    </Provider>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppWrapper />
);


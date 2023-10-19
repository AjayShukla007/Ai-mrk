// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {MyProvider} from '../Contaxt';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

disableReactDevTools();

  // <React.StrictMode>
  // </React.StrictMode>,
ReactDOM.createRoot(document.getElementById('root')!).render(
  <MyProvider>
    <App />
  </MyProvider>
)

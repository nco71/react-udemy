import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { Provider  } from 'react-redux'
import  { store, persistor } from './redux/store'

import './index.css'

import App from './App'
import * as serviceWorker from './serviceWorker';


const rootElement = document.getElementById('root')
ReactDOM.render(
 <Provider store={store}>
  <BrowserRouter>
  <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
  </BrowserRouter>
  </Provider>,
  rootElement
)

serviceWorker.register();

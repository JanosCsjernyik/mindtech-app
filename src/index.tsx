import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import store from './redux/store'
import { Provider } from 'react-redux'

// Entry point of the app, redux store is provided.
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

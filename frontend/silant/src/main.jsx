import React, { createContext }from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from './store/store.jsx'


const store = new Store();

export const Context = createContext({
  store,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </React.StrictMode>,
)
